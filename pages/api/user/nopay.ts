import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@/auth/[...nextauth]"
import { getUserByEmail } from '@/models/user';
import prisma from "@/lib/prismadb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    if (req.method !== "GET") {
        res.status(405).json({ message: "Method not allowed." });
        return;
    }
    const user = await getUserByEmail(session.user?.email as string);
    if (!user) {
        res.status(400).json({ message: "Bad request." });
        return;
    }
    const nopayServices = await getNoPayServices(user.id);
    const nopayHosts = await getNoPayHosts(user.id);
    res.status(200).json({services: nopayServices, hosts: nopayHosts});
}


const getNoPayServices = async (idUser: string) => {
    return await prisma.orderService.findMany({
        where: {
            userId: idUser
        },
        select: {
            id: true,
            rentDate: true,
            service: {
                select: {
                    name: true,
                    description: true,
                    price: true,
                }
            }
        }
    });
}


const getNoPayHosts = async (userId: string) => {
    return await prisma.noPayOrderHost.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            rentDate: true,
            host: {
                select: {
                    name: true,
                    price: true,
                }
            },
        }
    });
}
