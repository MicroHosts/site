import {NextApiRequest, NextApiResponse} from "next";
import {verifyRecovery} from "@/models/user";
import prisma from "@/lib/prismadb";

const bcrypt = require('bcrypt');

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


export const changePassword = async (token: string, password: string) => {
    const recoveryToken = await prisma.recoveryToken.findUnique({
        where: {
            token: token
        }
    });
    if (recoveryToken && recoveryToken.expires > new Date()) {
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, salt);
        await prisma.password.update({
            where: {
                userId: recoveryToken.userId
            },
            data: {
                salt: salt,
                hashed: passwordHashed,
            }
        });
        await prisma.recoveryToken.delete({
            where: {
                token: token
            }
        });
        return true;
    } else if (recoveryToken && recoveryToken.expires < new Date()) {
        await prisma.recoveryToken.delete({
            where: {
                token: token
            }
        });
    }
    return false;
}