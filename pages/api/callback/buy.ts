import {NextApiRequest, NextApiResponse} from "next";
import { buyHost } from "@/models/hosts";
import client from '@/lib/mail'
import {getUserById} from "@/models/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const userId = req.body.userId;
        const hostId = req.body.hostId;
        const buyHost1 = await buyHost(userId, hostId, 1);
        const user = await getUserById(userId);
        const mailData = {
            from: 'no-reply@microhost1.ru',
            to: user!.email,
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
        res.status(201).json({ message: 'Хост успешно создан'});
    }
}

