import {NextApiRequest, NextApiResponse} from "next";
import {checkAdmin, createAdmin} from "@/models/user";
import {validateEmail} from "@/utils/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const admin = await checkAdmin()
    if(admin){
        res.status(422).json({message: 'Администратор уже существует'})
        return
    }
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
        await createAdmin(username, email, password);
        res.status(200).json({ message: 'Created user' });
    } else {
        res.status(500).json({ message: 'Route not valid' });
    }
}

