import {NextApiRequest, NextApiResponse} from "next";
import {changePassword, createRecovery, deleteRecovery, verifyRecovery} from "@/models/user";
import {validateEmail} from "@/utils/utils";
import client from "@/lib/mail";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { password, token } = req.body;
        if (!password || password.length < 6) {
            res.status(422).json({ message: 'Некорректный пароль' });
            return;
        }
        if(!token){
            res.status(422).json({ message: 'Токен не передан' });
            return
        }
        const result = await verifyRecovery(token as string);
        if(!result){
            res.status(422).json({ message: 'Токен не верный' });
            return
        }
        const resultToken = await changePassword(token, password);
        if(!resultToken){
            res.status(422).json({ message: 'Токен не верный' });
            return
        }else{
            res.status(200).json({ message: 'Пароль успешно изменен' });
        }
    } else {
        res.status(500).json({ message: 'Route not valid' });
    }
}

