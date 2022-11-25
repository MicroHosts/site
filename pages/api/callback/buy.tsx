import {NextApiRequest, NextApiResponse} from "next";
import { buyHost } from "@/models/hosts";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const userId = req.body.userId;
        const hostId = req.body.hostId;
        const buyHost1 = await buyHost(userId, hostId);
        res.status(201).json({ message: 'Хост успешно создан'});
    }
}

