import type { NextApiRequest, NextApiResponse } from 'next'
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "@/auth/[...nextauth]"
import {getUserIdByEmail} from "@/models/user";
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
    const user = await getUserIdByEmail(session.user?.email as string);
    if(!user){
        res.status(400).json({ message: "Bad request." });
        return;
    }
    if(req.method === "PUT"){
        const data = req.body;
        await updateUserInfo(user.id, {data})
        res.status(201).json({ message: "User info updated." });
        return;
    }
    if(req.method !== "GET"){
        res.status(405).json({ message: "Method not allowed." });
        return;
    }
    const userInfo = await getUserInfo(user.id);
    res.status(201).json(userInfo);
}


export const updateUserInfo = async (id: string, { data }: any) => {
    return await prisma.userInfo.update({
        where: {
            userId: id,
        },
        data: {
            first_name: data.first_name,
            last_name: data.last_name,
            second_name: data.second_name,
            phone_number: data.phone_number,
        },
    })
};


export const getUserInfo = async (id: string) => {
    return await prisma.userInfo.findFirst({
        where: {
            userId: id
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            second_name: true,
            phone_number: true,
        },
    });
}