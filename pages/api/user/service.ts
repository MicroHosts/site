import type { NextApiRequest, NextApiResponse } from 'next'
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "@/auth/[...nextauth]"
import { getServiceByUserId, getServiceByUserIdHost } from '@/models/service';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if(!session){
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    if(!req.query.id){
        res.status(400).json({ message: "Bad request." });
        return;
    }
    if(req.method !== "GET"){
        res.status(405).json({ message: "Method not allowed." });
        return;
    }
    const category = req.query.category;
    const id = req.query.id as string;
    if(!category){
        res.status(400).json({ message: "Bad request." });
        return;
    }
    if(category === "service"){
        const service = await getServiceByUserId(id);
        res.status(201).json(service);
        return;
    }else if(category === "host"){
        const userInfo = await getServiceByUserIdHost(id);
        res.status(201).json(userInfo);
        return;
    }else{
        res.status(400).json({ message: "Bad request." });
        return;
    }
}
