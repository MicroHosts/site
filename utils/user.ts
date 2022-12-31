import {getUserByEmail} from "@/models/user";
import prisma from "@/lib/prismadb";
// @ts-ignore
import requestIp from 'request-ip'

export async function checkAdmin(session:any, req: any): Promise<Boolean>{
    const user = await getUserByEmail(session.user?.email);
    if(!user) {
        return false;
    }
    if(user.role !== "ADMIN") {
        return false;
    }
    const ip = requestIp.getClientIp(req)
    console.log(ip)
    const allow = await checkIp(ip);
    if(!allow){
        return false;
    }
    return true;
}

const checkIp = async (ip: string) => {
    return await prisma.adminIPS.findUnique({
        where: {
            ip: ip
        },
        select: {
            id: true,
        }
    })
}
