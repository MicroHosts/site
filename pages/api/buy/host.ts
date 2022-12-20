import { NextApiRequest, NextApiResponse } from "next";
import client from '@/lib/mail'
import { getUserIdByEmail } from "@/models/user";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@/auth/[...nextauth]";
import prisma from "@/lib/prismadb";

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
        if (!mounth) {
            res.status(400).json({ message: "Не указан срок аренды" });
            return;
        }
        if (!hostid) {
            res.status(400).json({ message: "Не указан ID хоста" });
            return;
        }
        let month = 1;
        let procent = 100;
        switch(mounth){
            case 1:
                month = 1;
                procent = 100;
                break;
            case 2:
                month = 6;
                procent = 95;
                break;
            case 3:
                month = 12;
                procent = 90;
                break;
            default:
                month = 1;
                break;
        }
        const user = await getUserIdByEmail(session.user!.email!);
        if (!user) {
            res.status(404).json({ message: "Пользователь не найден" });
            return;
        }
        if (!hostid) {
            res.status(400).json({ message: "Не указан ID хоста" });
            return;
        }

        const host = await getHostById(hostid as string);
        if (!host) {
            res.status(404).json({ message: "Хост не найден." });
            return;
        }
        if (host.Order) {
            res.status(400).json({ message: "Хост не доступен для покупки." });
            return;
        }
        const price1 = (host.price * month * procent) / 100;
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
            html: `<!doctype html>
<html>
<body>
<p>Поздравляем с покупкой хостинга</p>
<p>IP ${host.ip}</p>
<p>Логин: ${host.login}</p>
<p>Пароль: ${host.password}</p>
</body>
</html>`,

        }
        await client.sendMail(mailData, function (err: any, info: any) {
            // if (err)
            //     console.log(err)
            // else
            //     console.log(info);
        });
        const message =
            `Купили хост ${host.name} \n\n`+
            `На ${month} месяцев за ${price1} рублей`;
        const ret = await fetch(
            `https://api.telegram.org/bot${process.env.TELEGRAMBOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAMBOT_CHATID}&text=${message}`
        );
        await logBuy(host.name, user.id, price1, month, new Date());
        res.status(200).json({ message: 'Хост успешно куплен' });
    }
}


export const removeBalance = async (userId: string, amount: number) => {
    return await prisma.balance.update({
        where: {
            userId: userId
        },
        data: {
            amount: {
                decrement: amount
            }
        }
    });
}

const getHostById = async (id: string) => {
    return await prisma.host.findUnique({
        where: {
            id: id
        },
        include: {
            Order: true
        }
    });
}

const buyHost = async (userId: string, hostId: string, month: number) => {
    let date = new Date();
    date.setMonth(date.getMonth() + month);
    return await prisma.orderHost.create({
        data: {
            userId: userId,
            hostId: hostId,
            rentDate: date,
        },
    });
}

const logBuy = async (name: string, userId: string, price: number, month: number, currentMonth: Date) => {
    let date = currentMonth;
    date.setMonth(date.getMonth() + month);
    return await prisma.buyList.create({
        data: {
            name: `Продление хоста ${name}`,
            userId: userId,
            price: price,
            rentDate: date,
            status: "BUY",
            type: "HOST",
        },
    });
}