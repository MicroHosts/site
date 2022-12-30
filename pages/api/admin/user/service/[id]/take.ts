import {NextApiRequest, NextApiResponse} from "next";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "@/auth/[...nextauth]";
import prisma from "@/lib/prismadb";
import {getUserByEmail} from "@/models/user";
import {checkAdmin} from "@/utils/util";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if(!session){
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    const check = await checkAdmin(session, req);
    if(!check){
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    if (req.method === 'POST') {
        const {id} = req.query
        const service = await getServiceById(id as string);
        if(!service){
            res.status(404).json({ message: "Service not found." });
            return;
        }
        await takeService(id as string, service.id);
        res.status(200).json({ message: "Service taken." });
    }else if(req.method === "GET"){
    }else if(req.method === "DELETE"){
    }
}

const getServiceById = async (id: string) => {
    return await prisma.orderService.findUnique({
        where: {
            id: id,
        },
    })
}

const takeService = async (orderId: string, hostId: string) => {
    await prisma.orderService.delete({
            where: {
                id: orderId,
            }
    })
}
