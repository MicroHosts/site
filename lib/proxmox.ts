import { proxmoxApi, QmMonitor, type Proxmox } from "proxmox-api";

declare global {
    var proxmox: Proxmox.Api | undefined
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const client = globalThis.proxmox || proxmoxApi({tokenID: "root@pam!test", tokenSecret: "28fdecdb-7ff3-43c5-9d64-6a0f493055b5", host: "192.168.0.2"})

if (process.env.NODE_ENV !== "production") globalThis.proxmox = client


export default client