//TODO edit local for one user
import { proxmoxApi, QmMonitor, type Proxmox } from "proxmox-api";

declare global {
    var proxmox: Proxmox.Api | undefined
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const client = globalThis.proxmox || proxmoxApi({tokenID: "root@pam!microhost", tokenSecret: "e5e1d527-69f9-4c1c-b3b9-e9124e47db06", host: "82.140.114.122", port: 8080})

if (process.env.NODE_ENV !== "production") globalThis.proxmox = client


export default client
