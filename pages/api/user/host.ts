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
    const host = await getHostsByUserId(user.id);
    if (!host) {
        res.status(201).json([]);
        return;
    }
    res.status(200).json(host);
}

//TODO Pagination
const getHostsByUserId = async (userId: string) => {
    return await prisma.orderHost.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            rentDate: true,
            host: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                }
            }
        }
    });
}
