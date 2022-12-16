import {NextApiRequest, NextApiResponse} from "next";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "@/auth/[...nextauth]";
import {getUserByEmail, getUserIdByEmail} from "@/models/user";
import prisma from "@/lib/prismadb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if(!session){
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    const user = await getUserByEmail(session.user?.email);
    if(!user){
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    if(user.role !== "ADMIN"){
        res.status(401).json({ message: "You must be admin." });
        return;
    }

    if (req.method === 'POST') {
        const {id} = req.query
        const host = await getHostById(id as string);
        if(!host){
            res.status(404).json({ message: "Host not found." });
            return;
        }
        await takeHost(id as string, host.id);
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
    await prisma.$transaction([
        prisma.orderHost.delete({
            where: {
                id: orderId,
            }
        }),
        prisma.host.update({
            where: {
                id: hostId,
            },
            data: {
                ready: false
            }
        })
    ])
}
