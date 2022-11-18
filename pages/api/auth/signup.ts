import {NextApiRequest, NextApiResponse} from "next";
import {createUser} from "@/models/user";
import {validateEmail} from "@/utils/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { username,  email, password } = req.body;
        if (!email || email.length < 6 && !validateEmail(email)) {
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
        res.status(201).json({ message: 'Created user', token: token });
    } else {
        res.status(500).json({ message: 'Route not valid' });
    }
}

