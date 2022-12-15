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
        const { serviceid, mounth } = req.body
        if(!mounth){
            res.status(400).json({ message: "Не указан срок аренды" });
            return;
        }
        if(!serviceid){
            res.status(400).json({ message: "Не указан Сервиса хоста" });
            return;
        }
        if(mounth > 12){
            res.status(400).json({ message: "Срок аренды не может быть больше 12 месяцев" });
            return;
        }
        if(mounth < 1){
            res.status(400).json({ message: "Срок аренды не может быть меньше 1 месяца" });
            return;
        }
        const user = await getUserIdByEmail(session.user!.email!);
        if (!user) {
            res.status(404).json({ message: "Пользователь не найден" });
            return;
        }
        const month = req.body.mounth ? req.body.mounth : 1;
        const service = await getServiceById(serviceid as string);
        if (!service) {
            res.status(404).json({ message: "Сервис не найден." });
            return;
        }
        if (service.Order) {
            res.status(400).json({ message: "Сервис не доступен для покупки." });
            return;
        }
        const price1 = service.price * month;
        if (price1 > user.balance?.amount!) {
            res.status(400).json({ message: "Не хватает денег." });
            return;
        }
        await removeBalance(user.id, price1);
        await buyService(user.id, serviceid, mounth);
        res.status(200).json({ message: 'Сервер успешно куплен' });
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

const getServiceById = async (id: string) => {
    return await prisma.service.findUnique({
        where: {
            id: id
        },
        include: {
            Order: true
        }
    });
}

const buyService = async (userId: string, serviceId: string, month: number) => {
    let date = new Date();
    date.setMonth(date.getMonth() + month);
    return await prisma.orderService.create({
        data: {
            userId: userId,
            serviceId: serviceId,
            rentDate: date,
        },
    });
}
