import {NextApiRequest, NextApiResponse} from "next";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "@/auth/[...nextauth]";
import {getUserByEmail, getUserIdByEmail} from "@/models/user";
import prisma from "@/lib/prismadb";
import {checkAdmin} from "@/utils/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if(!session){
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    const check = await checkAdmin(session, req);
    if(!check){
        res.status(401).json({ message: "You must be logged in." });
        return;
    }

    if (req.method === 'POST') {
        const {id} = req.query
        const host = await getHostById(id as string);
        if(!host){
            res.status(404).json({ message: "Host not found." });
            return;
        }
        await takeHost(id as string, host.host!!.id);
        res.status(200).json({ message: "Host taken." });
    }
}

const getHostById = async (id: string) => {
    return await prisma.orderHost.findUnique({
        where: {
            id: id,
        },
        include: {
            host: true
        }
    })
}

const takeHost = async (orderId: string, hostId: string) => {
    await prisma.orderHost.delete({
        where: {
            id: orderId,
        }
    })
    await prisma.host.update({
        where: {
            id: hostId,
        },
        data: {
            ready: false
        }
    })
}
