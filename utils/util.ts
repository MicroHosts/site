import proxmox from "@/lib/proxmox";
import { proxmoxApi, QmMonitor } from "proxmox-api";
import {getUserByEmail} from "@/models/user";
import prisma from "@/lib/prismadb";
// @ts-ignore
import requestIp from 'request-ip'

export async function getQemuByID(vimID: number) {
    const nodes = await proxmox.nodes.$get();
    let node1 = null;
    for (const node of nodes) {
        const theNode = proxmox.nodes.$(node.node);
        // list Qemu VMS
        const qemus = await theNode.qemu.$get({ full: true });
        // iterate Qemu VMS
        for (const qemu of qemus) {
            if (qemu.vmid === vimID) {
                // stop Qemu VM
                node1 = theNode;
                break
            }
        }
    }
    return node1;
}


export async function checkAdmin(session:any, req: any): Promise<Boolean>{
    const user = await getUserByEmail(session.user?.email);
    if(!user) {
        return false;
    }
    if(user.role !== "ADMIN") {
        return false;
    }
    const ip = requestIp.getClientIp(req)
    const allow = await checkIp(ip);
    if(!allow){
        return false;
    }
    return true;
}

const checkIp = async (ip: string) => {
    return await prisma.adminIPS.findUnique({
        where: {
            id: ip
        },
        select: {
            id: true,
        }
    })
}
