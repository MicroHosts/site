import {NextApiRequest, NextApiResponse} from "next";
import {createRecovery} from "@/models/user";
import {validateEmail} from "@/utils/utils";
import client from "@/lib/mail";

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
        client.sendMail(mailData, (err, info) => {
            if(err){
                console.log(err)
            }else{
                console.log(info)
            }
        });
        res.status(200).json({ message: 'На вашу почту был отправлено письмо для восстановления аккаунта' });
    } else {
        res.status(500).json({ message: 'Route not valid' });
    }
}

