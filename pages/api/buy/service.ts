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
        const { serviceid, mounth } = req.body
        if(!mounth){
            res.status(400).json({ message: "Не указан срок аренды" });
            return;
        }
        if(!serviceid){
            res.status(400).json({ message: "Не указан Сервиса хоста" });
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
        const service = await getServiceById(serviceid as string, user.id);
        if (!service) {
            res.status(404).json({ message: "Сервис не найден." });
            return;
        }
        const price1 = (service.price * month * procent) / 100;
        if (price1 > user.balance?.amount!) {
            res.status(400).json({ message: "Не хватает денег." });
            return;
        }
        await removeBalance(user.id, price1);
        await buyService(user.id, serviceid, mounth);
        await logBuy(service.name, user.id, price1, month, new Date());
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

const getServiceById = async (id: string, idUser: string) => {
    return await prisma.service.findFirst({
        where: {
            id: id,
            Order: {
                every: {
                    NOT: {
                        userId: idUser
                    }
                }
            }
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

const logBuy = async (name: string, userId: string, price: number, month: number, currentMonth: Date) => {
    let date = currentMonth;
    date.setMonth(date.getMonth() + month);
    return await prisma.buyList.create({
        data: {
            name: `Продление сервиса ${name}`,
            userId: userId,
            price: price,
            rentDate: date,
            status: "BUY",
            type: "SERVICE",
        },
    });
}