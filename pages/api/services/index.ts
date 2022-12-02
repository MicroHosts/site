import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@/auth/[...nextauth]"
import { getAvaliableService } from '@/models/service';
import { getUserIdByEmail } from '@/models/user';

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
        res.status(401).json({ message: "Unauthorized." });
        return;
    }
    const user = await getUserIdByEmail(session.user!.email!);
    if(!user) {
        res.status(401).json({ message: "Unauthorized." });
        return;
    }
    const page = req.query.page ? req.query.page : 1;
    const avaliableServices = await getAvaliableService(page as number, user.id);
    res.status(200).json({ services: avaliableServices[1], count: avaliableServices[0] });
    return;
}
