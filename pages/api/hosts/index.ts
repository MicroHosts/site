import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@/auth/[...nextauth]"
import {getAvaliableMainPageHosts, checkIsUserHost} from '@/models/hosts';
import {getUserByEmail} from "@/models/user";
import prisma from "@/lib/prismadb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        const hosts = await getAvaliableMainPageHosts();
        res.status(200).json(hosts);
        return;
    }
    if (req.method !== "GET") {
        const user = await getUserByEmail(session.user?.email);
        if(!user){
            res.status(401).json({message: "Unauthorized"});
            return
        }
        if(req.query.id){
            const host = await checkIsUserHost(user.id, req.query.id as string);
            if(host === null) {
                res.status(401).json({message: "Unauthorized"});
                return
            }
            res.status(200).json(true);
        }
        res.status(401).json({message: "Unauthorized"});
        return
    }
    const page = req.query.page ? req.query.page : 1;
    const avaliableHosts = await getAvailableHosts(page as number);
    res.status(200).json({ hosts: avaliableHosts[1], count: avaliableHosts[0] });
    return;
}

const getAvailableHosts = async (page: number) => {
    return await prisma.$transaction([
        prisma.host.count({
            where: {
                Order: null,
                NoPayOrder: null,
                ready: true
            },
        }),
        prisma.host.findMany({
            take: 5,
            skip: (page - 1) * 5,
            orderBy: {
                id: "desc",
            },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                cpu: true,
                ram: true,
                storage: true,
            },
            where: {
                Order: null,
                NoPayOrder: null,
                ready: true
            },
        })
    ])
}