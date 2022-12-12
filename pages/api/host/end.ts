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
    await node.qemu.$(host.vimid).status.stop.$post();
    // await node.qemu.$(host.vimid).vncproxy.$post();
    res.status(200).json({ message: "OK" });
    return
}
