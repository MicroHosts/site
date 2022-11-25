import {NextApiRequest, NextApiResponse} from "next";
import {createHost, deleteHost, getHostById, getHosts, updateHost} from "@/models/hosts";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "@/auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if(!session){
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    if(session.user?.email !== "admin@microhost1.ru"){
        res.status(401).json({ message: "You must be admin." });
        return;
    }
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
        const idproxmo1 = parseInt(idproxmox);
        if(price1 === 0){
            res.status(422).json({ message: 'Цена не может быть 0'});
            return;
        }
        const host = await createHost(hostName, cpuInfo, ramInfo, storageInfo, idproxmo1, login, password, ip, desciption, price1);
        res.status(201).json({ message: 'Хост успешно создан'});
    }else if(req.method === 'PUT') {
        console.log(req.body);
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
        const idproxmo1 = parseInt(idproxmox);
        if(price1 === 0){
            res.status(422).json({ message: 'Цена не может быть 0'});
            return;
        }
        if(!req.query.id){
            res.status(422).json({ message: 'ID не может быть пустым'});
            return;
        }
        const id = req.query.id as string;
        const host = await updateHost(id, hostName, cpuInfo, ramInfo, storageInfo, idproxmo1, login, password, ip, desciption, price1);
        res.status(201).json({ message: 'Хост успешно обновлен'});
    }else if(req.method === 'GET') {
        if(req.query.id){
            const host = await getHostById(req.query.id as string);
            res.status(200).json(host);
            return;
        }
        const hosts = await getHosts();
        res.status(200).json(hosts);
    }else if(req.method === "DELETE") {
        if(!req.query.id){
            res.status(422).json({ message: 'ID не может быть пустым'});
            return;
        }
        const id = req.query.id as string;
        const host = await deleteHost(id);
        res.status(201).json({ message: 'Хост успешно удален'});
    }else {
        res.status(500).json({ message: 'Route not valid' });
    }
}

