import type { NextApiRequest, NextApiResponse } from 'next'
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]"
import {getUserByName} from "../../../models/user";

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
    const user = await getUserByName(session.user?.name);
    if(user === null){
        res.status(404).json({ message: "User not found." });
        return;
    }
    res.status(201).json(user);
}
