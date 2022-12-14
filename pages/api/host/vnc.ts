// import type { NextApiRequest, NextApiResponse } from 'next'
// import { getHostById } from '@/models/hosts';
// import { getQemuByID } from '@/utils/util';
// import { checkByHost } from 'services/host';
// import {setCookie} from "cookies-next";

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     const check = await checkByHost(req, res);
//     if(check) return;
//     const host = await getHostById(req.query.id as string);
//     if (!host) {
//         res.status(404).json({ message: "Not found" });
//         return
//     }
//     const node = await getQemuByID(host.vimid);
//     if (!node) {
//         res.status(404).json({ message: "Not found" });
//         return
//     }
//     const vncproxy =  await node.qemu.$(host.vimid).vncproxy.$post()
//     console.log(vncproxy)
//     // res.status(200).json({ message: `wss://82.140.114.122:8080/api2/json/nodes/main3/qemu/100/vncwebsocket?port=${vncproxy.port}&vncticket=${encodeURI(vncproxy.ticket)}` });
//     res.status(200).json({ message: `https://82.140.114.122:8080/?console=kvm&novnc=1&node=main3&resize=scale&vmid=${host.vimid}&path=${encodeURI(`/nodes/main3/qemu/${host.vimid}/vncwebsocket?port=${vncproxy.port}&vncticket=${vncproxy.ticket}`)}` });
//     return
// }
