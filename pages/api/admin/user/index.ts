import {NextApiRequest, NextApiResponse} from "next";
import {createService, deleteService, getAllServices, updateService} from "@/models/service";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "@/auth/[...nextauth]";
import { getAllUsers } from "@/models/user";

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
        let page = req.query.page ? req.query.page : 1
        const search = req.query.search ? req.query.search : '';
        const users = await getAllUsers(page as number, search as string);
        res.status(200).json({users: users[1], count: users[0]});
    }else if(req.method === "DELETE"){
    }
}

