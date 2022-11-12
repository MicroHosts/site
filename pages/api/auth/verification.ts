import {NextApiRequest, NextApiResponse} from "next";
import {verifyUser} from "../../../models/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const { token } = req.query;
        if(!token || typeof token !== "string"){
            res.status(422).json({ message: 'Некорректный токен' });
            return;
        }
        const result = await verifyUser(token as string);
        if (result) {
            res.status(200).json({ message: 'Пользователь подтвержден' });
        }else{
            res.status(422).json({ message: 'Некорректный токен' });
        }
    } else {
        res.status(500).json({ message: 'Route not valid' });
    }
}

