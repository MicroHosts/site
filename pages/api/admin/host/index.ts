import { NextApiRequest, NextApiResponse } from "next";
import { getHostById } from "@/models/hosts";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@/auth/[...nextauth]";
import prisma from "@/lib/prismadb";
import {getUserByEmail} from "@/models/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    const user = await getUserByEmail(session.user?.email);
    if(!user) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    if(user.role !== "ADMIN") {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    if (req.method === 'POST') {
        const { hostName, cpuInfo, ramInfo, storageInfo, idproxmox, login, password, ip, desciption, price,                 vnc,
            vncPassword } = req.body;
        if(!validate({ hostName, cpuInfo, ramInfo, storageInfo, idproxmox, login, password, ip, desciption, price, res })) {
            return;
        }
        const price1 = parseInt(price);
        const idproxmo1 = parseInt(idproxmox);
        if(!validatePriceAndIDProxmox({ price1, idproxmo1, res })) {
            return;
        }
        await createHost(hostName, cpuInfo, ramInfo, storageInfo, idproxmo1, login, password, ip, desciption, price1, vnc, vncPassword);
        res.status(201).json({ message: 'Хост успешно создан' });
    } else if (req.method === 'PUT') {
        const { hostName, cpuInfo, ramInfo, storageInfo, idproxmox, login, password, ip, desciption, price } = req.body;
        if(!validate({ hostName, cpuInfo, ramInfo, storageInfo, idproxmox, login, password, ip, desciption, price, res })) {
            return;
        }
        const price1 = parseInt(price);
        const idproxmo1 = parseInt(idproxmox);
        if(!validatePriceAndIDProxmox({ price1, idproxmo1, res })) {
            return;
        }
        if (!req.query.id) {
            res.status(422).json({ message: 'ID не может быть пустым' });
            return;
        }
        const id = req.query.id as string;
        await updateHost(id, hostName, cpuInfo, ramInfo, storageInfo, idproxmo1, login, password, ip, desciption, price1);
        res.status(201).json({ message: 'Хост успешно обновлен' });
    } else if (req.method === 'GET') {
        if (req.query.id) {
            const host = await getHostById(req.query.id as string);
            res.status(200).json(host);
            return;
        }
        let page = req.query.page ? req.query.page : 1
        const search = req.query.search ? req.query.search : '';
        const hosts = await getHosts(page as number, search as string);
        res.status(200).json({ hosts: hosts[1], count: hosts[0] });
    } else if (req.method === "DELETE") {
        if (!req.query.id) {
            res.status(422).json({ message: 'ID не может быть пустым' });
            return;
        }
        const id = req.query.id as string;
        await deleteHost(id);
        res.status(201).json({ message: 'Хост успешно удален' });
    } else {
        res.status(500).json({ message: 'Route not valid' });
    }
}

function validate({ password, login, ip, idproxmox, hostName, cpuInfo, ramInfo, storageInfo, desciption, price, res }: any) {
    if (!password || password.length < 6) {
        res.status(422).json({ message: 'Пароль должен быть больше 6 символов' });
        return false;
    }
    if (!login) {
        res.status(422).json({ message: 'Логин не может быть пустым' });
        return false;
    }
    if (!ip) {
        res.status(422).json({ message: 'IP не может быть пустым' });
        return false;
    }
    if (!idproxmox) {
        res.status(422).json({ message: 'ID Proxmox не может быть пустым' });
        return false;
    }
    if (!hostName) {
        res.status(422).json({ message: 'Имя хоста не может быть пустым' });
        return false;
    }
    if (!cpuInfo) {
        res.status(422).json({ message: 'Информация о CPU не может быть пустой' });
        return false;
    }
    if (!ramInfo) {
        res.status(422).json({ message: 'Информация о RAM не может быть пустой' });
        return  false;
    }
    if (!storageInfo) {
        res.status(422).json({ message: 'Информация о хранилище не может быть пустой' });
        return false;
    }
    if (!desciption) {
        res.status(422).json({ message: 'Описание не может быть пустым' });
        return false;
    }
    if (!price) {
        res.status(422).json({ message: 'Цена не может быть пустой' });
        return false;
    }
    return true;
}

function validatePriceAndIDProxmox({ price1, idproxmo1, res }: any) {
    if (price1 === 0) {
        res.status(422).json({ message: 'Цена не может быть 0' });
        return false;
    }
    if (idproxmo1 === 0) {
        res.status(422).json({ message: 'ID Proxmox не может быть 0' });
        return false;
    }
    return true;
}


const getHosts = async (page: number, search: string) => {
    return await prisma.$transaction([
        prisma.host.count({
            where: {
                name: {
                    contains: search,
                }
            },
        }),
        prisma.host.findMany({
            take: 5,
            skip: (page - 1) * 5,
            orderBy: {
                id: "desc",
            },
            where: {
                name: {
                    contains: search,
                }
            },
        })
    ])
}


const deleteHost = async (id: string) => {
    return await prisma.host.delete({
        where: {
            id: id,
        }
    });
}

const createHost = async (
    hostName: string,
    cpuInfo: string,
    ramInfo: string,
    storageInfo: string,
    idproxmox: number,
    login: string,
    password: string,
    ip: string,
    desciption: string,
    price: number,
    vnc: string,
    vncPassword: string,
) => {

    return await prisma.host.create({
        data: {
            name: hostName,
            cpu: cpuInfo,
            ram: ramInfo,
            storage: storageInfo,
            vimid: idproxmox,
            login: login,
            password: password,
            ip: ip,
            description: desciption,
            price: price,
        },
    });
}

const updateHost = async (
    id: string,
    hostName: string,
    cpuInfo: string,
    ramInfo: string,
    storageInfo: string,
    idproxmox: number,
    login: string,
    password: string,
    ip: string,
    desciption: string,
    price: number,
) => {
    return await prisma.host.update({
        where: {
            id: id,
        },
        data: {
            name: hostName,
            cpu: cpuInfo,
            ram: ramInfo,
            storage: storageInfo,
            vimid: idproxmox,
            login: login,
            password: password,
            ip: ip,
            description: desciption,
            price: price,
        },
    });
}
