import {NextApiRequest, NextApiResponse} from "next";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "@/auth/[...nextauth]";
import prisma from "@/lib/prismadb";
import {getUserByEmail} from "@/models/user";
// @ts-ignore
import requestIp from 'request-ip'

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
    if(!user) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    if(user.role !== "ADMIN") {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    if(req.method === "GET"){
        const ip = requestIp.getClientIp(req)
        const allow = await checkIp(ip);
        if(!allow){
            res.status(401).json({ message: "You must be logged in." });
            return;
        }
        res.status(200).json({ message: "Успешно." });
    }
}

const checkIp = async (ip: string) => {
    return await prisma.adminIPS.findUnique({
        where: {
            id: ip
        },
        select: {
            id: true,
        }
    })
}

