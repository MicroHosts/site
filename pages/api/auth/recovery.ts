import {NextApiRequest, NextApiResponse} from "next";
import {getUserByEmail} from "@/models/user";
import {makeid, validateEmail} from "@/utils/utils";
import client from "@/lib/mail";
import prisma from "@/lib/prismadb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { email } = req.body;
        if (!email || email.length < 6 && !validateEmail(email)) {
            res.status(422).json({ message: 'Некорректный email' });
            return;
        }
        const token = await createRecovery(email);
        if(!token){
            res.status(422).json({ message: 'Такого аккаунта нету' });
            return
        }
        //Отправить письмо с токеном
        const mailData = {
            from: 'no-reply@microhost1.ru',
            to: email,
            subject: 'Восстановление аккаунта',
            html: `<h1>Подтвердите почту</h1>
            <p>Для восстановления аккаунта перейдите по ссылке</p>
            <a href="http://localhost:3000/auth/reset?token=${token}">Восстановить</a>
            `,
            text: 'Восстановление аккаунта',
        }
        client.sendMail(mailData, (err:any, info:any) => {
        });
        res.status(200).json({ message: 'На вашу почту был отправлено письмо для восстановления аккаунта' });
    } else {
        res.status(500).json({ message: 'Route not valid' });
    }
}



export const createRecovery = async (email: string) => {
    const user = await getUserByEmail(email);
    if (!user) {
        return null;
    }
    //check if token exists
    const token1 = await prisma.recoveryToken.findFirst({
        where: {
            userId: user.id
        }
    });
    if (token1) {
        return token1.token;
    }
    const token = makeid(32);
    await prisma.recoveryToken.create({
        data: {
            token: token,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            user: {
                connect: {
                    id: user.id
                }
            }
        }
    });
    return token;
}


