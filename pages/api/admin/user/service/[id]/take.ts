import {NextApiRequest, NextApiResponse} from "next";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "@/auth/[...nextauth]";
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
    if(session.user?.email !== "admin@microhost1.ru"){
        res.status(401).json({ message: "You must be admin." });
        return;
    }
    if (req.method === 'POST') {

    }else if(req.method === "GET"){
    }else if(req.method === "DELETE"){
    }
}
