//TODO get avaliable host get and buy host
import type { NextApiRequest, NextApiResponse } from 'next'
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "@/auth/[...nextauth]"
import { getAvailableHosts, getHostsByUserId } from '@/models/hosts';

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
    if(!req.query.id){
        const avaliableHosts = await getAvailableHosts();
        res.status(200).json(avaliableHosts);
        return;
    }
    const host = await getHostsByUserId(req.query.id as string);
    if(!host){
        res.status(201).json([]);
        return;
    }
    res.status(200).json(host);
}