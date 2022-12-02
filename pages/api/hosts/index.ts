import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@/auth/[...nextauth]"
import { getAvaliableMainPageHosts, getAvailableHosts } from '@/models/hosts';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (req.method !== "GET") {
        res.status(405).json({ message: "Method not allowed." });
        return;
    }
    if (!session) {
        const hosts = await getAvaliableMainPageHosts();
        res.status(200).json(hosts);
        return;
    }
    const page = req.query.page ? req.query.page : 1;
    const avaliableHosts = await getAvailableHosts(page as number);
    res.status(200).json({ hosts: avaliableHosts[1], count: avaliableHosts[0] });
    return;
}
