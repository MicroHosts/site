import {NextApiRequest, NextApiResponse} from "next";
import {createUser} from "@/models/user";
import {validateEmail} from "@/utils/utils";
import client from "@/lib/mail";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { hostName,  cpuInfo, ramInfo, storageInfo, idproxmox, login, password, ip, desciption, price } = req.body;
        if(!password || password.length < 6){
            res.status(422).json({ message: 'Пароль должен быть больше 6 символов'});
            return;
        }
        if(!login){
            res.status(422).json({ message: 'Логин не может быть пустым'});
            return;
        }
        if(!ip){
            res.status(422).json({ message: 'IP не может быть пустым'});
            return;
        }
        if(!idproxmox){
            res.status(422).json({ message: 'ID Proxmox не может быть пустым'});
            return;
        }
        if(!hostName){
            res.status(422).json({ message: 'Имя хоста не может быть пустым'});
            return;
        }
        if(!cpuInfo){
            res.status(422).json({ message: 'Информация о CPU не может быть пустой'});
            return;
        }
        if(!ramInfo){
            res.status(422).json({ message: 'Информация о RAM не может быть пустой'});
            return;
        }
        if(!storageInfo){
            res.status(422).json({ message: 'Информация о хранилище не может быть пустой'});
            return;
        }
        if(!desciption){
            res.status(422).json({ message: 'Описание не может быть пустым'});
            return;
        }
        if(!price){
            res.status(422).json({ message: 'Цена не может быть пустой'});
            return;
        }
        const price1 = parseInt(price);
        if(price1 === 0){
            res.status(422).json({ message: 'Цена не может быть 0'});
            return;
        }
        
    } else {
        res.status(500).json({ message: 'Route not valid' });
    }
}

