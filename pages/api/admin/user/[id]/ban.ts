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
        const user = await getUserById(id as string);
        if(!user){
            res.status(404).json({ message: "User not found." });
            return;
        }
        await banUser(id as string, !user.blocked);
        res.status(200).json({ message: "User banned." });
    }
}

const getUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: {
            id: id,
        },
    })
}

const banUser = async (userId: string, blocked: boolean) => {
    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            blocked: blocked
        }
    })
}
