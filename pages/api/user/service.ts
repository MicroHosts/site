import type { NextApiRequest, NextApiResponse } from 'next'
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "@/auth/[...nextauth]"
import { getUserService } from '@/models/service';
import { getUserIdByEmail } from '@/models/user';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if(!session){
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    if(req.method !== "GET"){
        res.status(405).json({ message: "Method not allowed." });
        return;
    }
    const user = await getUserIdByEmail(session.user?.email as string);
    if(!user){
        res.status(400).json({ message: "Bad request." });
        return;
    }
    const page = req.query.page ? req.query.page : 1
    const services = await getUserService(page as number, user.id);
    res.status(200).json({services: services[1], count: services[0]});
}
