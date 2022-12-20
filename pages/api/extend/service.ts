import { NextApiRequest, NextApiResponse } from "next";
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
        const { orderId, mounth } = req.body
        if (!mounth) {
            res.status(400).json({ message: "Не указан срок аренды" });
            return;
        }
        if (!orderId) {
            res.status(400).json({ message: "Не указан ID сервиса" });
            return;
        }
        let month = 1;
        let procent = 100;
        switch (mounth) {
            case 1:
                month = 1;
                procent = 100;
                break;
            case 2:
                month = 6;
                procent = 90;
                break;
            case 3:
                month = 12;
                procent = 80;
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
        const service = await getOrderId(orderId as string, user.id);
        if (!service) {
            res.status(404).json({ message: "Сервис не найден." });
            return;
        }
        const price1 = (service.service.price * month * procent) / 100;
        if (price1 > user.balance?.amount!) {
            res.status(400).json({ message: "Не хватает денег." });
            return;
        }
        await removeBalance(user.id, price1);
        await extendService(orderId, month, service.rentDate);
        await logExpend(service.service.name, user.id, price1, month, service.rentDate)
        res.status(200).json({ message: 'Услгула успешно продлена' });
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
        },
    });
}

const getOrderId = async (id: string, idUser: string) => {
    return await prisma.orderService.findFirst({
        where: {
            id: id,
            userId: idUser
        },
        include: {
            service: true
        }
    });
}

const extendService = async (orderId: string, month: number, currentMonth: Date) => {
    let date = currentMonth;
    date.setMonth(date.getMonth() + month);
    return await prisma.orderService.update({
        where: {
            id: orderId,
        },
        data: {
            rentDate: date,
        },
    });
}

const logExpend = async (name: string, userId: string, price: number, month: number, currentMonth: Date) => {
    let date = currentMonth;
    date.setMonth(date.getMonth() + month);
    return await prisma.buyList.create({
        data: {
            name: `Продление сервиса ${name}`,
            userId: userId,
            price: price,
            rentDate: date,
            status: "EXPEND",
            type: "SERVICE",
        },
    });
}
