import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@/auth/[...nextauth]"
import { checkIsUserHost, getHostById } from '@/models/hosts';
import { getUserByEmail } from "@/models/user";

//Proxmox control by Host
export const checkByHost = async (req: NextApiRequest, res: NextApiResponse): Promise<Boolean> => {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).json({ message: "Unauthorized" });
        return true;
    }
    const user = await getUserByEmail(session.user?.email);
    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return true;
    }
    if (!req.query.id) {
        res.status(400).json({ message: "Bad request" });
        return true;
    }
    if (user.role !== "ADMIN") {
        const isUserHost = await checkIsUserHost(user.id, req.query.id as string);
        if (!isUserHost) {
            res.status(401).json({ message: "Unauthorized" });
            return true;
        }
    }
    return false;
}
