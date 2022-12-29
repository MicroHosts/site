//TODO edit local for one user
import { proxmoxApi, QmMonitor, type Proxmox } from "proxmox-api";

declare global {
    var proxmox: Proxmox.Api | undefined
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const client = globalThis.proxmox || proxmoxApi({tokenID: process.env.PROXMOX_TOKENID as string, tokenSecret: process.env.PROXMOX_TOKEN_SECRET as string, host: process.env.PROXMOX_HOST as string, port: process.env.PROXMOX_PORT as unknown as number})

if (process.env.NODE_ENV !== "production") globalThis.proxmox = client


export default client
