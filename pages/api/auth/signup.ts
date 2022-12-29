import {NextApiRequest, NextApiResponse} from "next";
import {getUserByEmail} from "@/models/user";
import {makeid, validateEmail} from "@/utils/utils";
import client from "@/lib/mail";
import prisma from "@/lib/prismadb";

const bcrypt = require('bcrypt');

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { username,  email, password } = req.body;
        if (!validateEmail(email)) {
            res.status(422).json({ message: 'Некорректный email' });
            return;
        }
        if(!password || password.length < 6){
            res.status(422).json({ message: 'Пароль должен быть больше 6 символов'});
            return;
        }
        if(password.length > 20){
            res.status(422).json({ message: 'Пароль должен быть меньше 20 символов'});
            return;
        }
        if(!username || username.trim().length < 3){
            res.status(422).json({ message: 'Имя пользователя должно быть больше 3 символов' });
            return;
        }
        const token = await createUser(username, email, password);
        if(!token){
            res.status(422).json({ message: 'Такой пользователь уже есть' });
            return;
        }
        //Отправить письмо с токеном
        const mailData ={
            from: 'no-reply@microhost1.ru',
            to: email,
            subject: 'Подтверждение почты',
            html: `<h1>Подтвердите почту</h1>
            <p>Для подтверждения перейдите по ссылке</p>
            <a href="https://microhost1.ru/auth/verify?token=${token}">Подтвердить почту</a>
            `,
            text: 'Подтвердите почту',
        }
        client.sendMail(mailData, (err:any, info:any) => {
            console.log(err)
        });
        res.status(200).json({ message: 'Created user' });
    } else {
        res.status(500).json({ message: 'Route not valid' });
    }
}



const createUser = async (name: string, email: string, password: string) => {
    const user1 = await getUserByEmail(email);
    if (user1) {
        return null;
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
        }
    });
    await prisma.password.create({
        data: {
            salt: salt,
            hashed: passwordHashed,
            user: {
                connect: {
                    id: user.id
                }
            }
        }
    });
    const token = makeid(32);
    await prisma.verificationToken.create({
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
