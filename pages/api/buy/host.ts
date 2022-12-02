import { NextApiRequest, NextApiResponse } from "next";
import { buyHost, getHostById } from "@/models/hosts";
import client from '@/lib/mail'
import { getUserIdByEmail, removeBalance } from "@/models/user";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@/auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).json({ message: "Unauthorized." });
        return;
    }
    if (req.method === 'POST') {
        const { hostid, mounth } = req.body
        const user = await getUserIdByEmail(session.user!.email!);
        if (!user) {
            res.status(404).json({ message: "Пользователь не найден" });
            return;
        }
        if (!hostid) {
            res.status(400).json({ message: "Не указан ID хоста" });
            return;
        }
        const month = req.body.mounth ? req.body.mounth : 1;
        const host = await getHostById(hostid as string);
        if (!host) {
            res.status(404).json({ message: "Хост не найден." });
            return;
        }
        if (host.Order) {
            res.status(400).json({ message: "Хост не доступен для покупки." });
            return;
        }
        const price1 = host.price * month;
        if (price1 > user.balance?.amount!) {
            res.status(400).json({ message: "Не хватает денег." });
            return;
        }
        await removeBalance(user.id, price1);
        await buyHost(user.id, hostid, mounth);
        const mailData = {
            from: 'no-reply@microhost1.ru',
            to: session.user?.email,
            subject: 'Покупка хостинга',
            text: 'Поздравляем с покупкой хостинга',
            html: '<p>Поздравляем с покупкой хостинга</p>',
            amp: `
            <!doctype html>
<html ⚡4email>
<head>
  <meta charset="utf-8">
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
</head>
<body>
<p>IP 192.168.0.1</p>
<p>Логин: sshLogin</p>
<p>Пароль: example</p>
</body>
</html>
`

        }
        await client.sendMail(mailData, function (err, info) {
            if (err)
                console.log(err)
            else
                console.log(info);
        });
        res.status(200).json({ message: 'Хост успешно куплен' });
    }
}

