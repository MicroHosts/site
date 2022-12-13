import proxmox from "@/lib/proxmox";
import { proxmoxApi, QmMonitor } from "proxmox-api";

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

