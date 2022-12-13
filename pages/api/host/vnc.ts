import type { NextApiRequest, NextApiResponse } from 'next'
import { getHostById } from '@/models/hosts';
import { getQemuByID } from '@/utils/util';
import { checkByHost } from 'services/host';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const check = await checkByHost(req, res);
    if(check) return;
    const host = await getHostById(req.query.id as string);
    if (!host) {
        res.status(404).json({ message: "Not found" });
        return
    }
    const node = await getQemuByID(host.vimid);
    if (!node) {
        res.status(404).json({ message: "Not found" });
        return
    }
    const vncproxy =  await node.qemu.$(host.vimid).vncproxy.$post({"generate-password": false})
    const vnc = await node.qemu.$(host.vimid).vncwebsocket.$get({vncticket: vncproxy.ticket, port: vncproxy.port})
    console.log(vnc)
    res.status(200).json({ message: vnc });
    return
}
