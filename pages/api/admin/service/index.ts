import {NextApiRequest, NextApiResponse} from "next";
import {deleteService, getServiceById, getServices, updateService} from "@/models/service";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "@/auth/[...nextauth]";
import prisma from "@/lib/prismadb";
import {getUserByEmail} from "@/models/user";
import {checkAdmin} from "@/utils/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if(!session){
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    const check = await checkAdmin(session, req);
    if(!check){
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    if (req.method === 'POST') {
        const { name, desciption, price } = req.body;
        if(!validate({ name, desciption, price, res })) {
            return;
        }
        const price1 = parseInt(price);
        if(price1 === 0){
            res.status(422).json({ message: 'Цена не может быть 0'});
            return;
        }
        await createService(name, desciption, price1);
        res.status(201).json({ message: 'Услуга успешно создана'});
    }else if(req.method === "GET"){
        if(req.query.id){
            const host = await getServiceById(req.query.id as string);
            res.status(200).json(host);
            return;
        }
        let page = req.query.page ? req.query.page : 1
        const search = req.query.search ? req.query.search : '';
        const services = await getServices(page as number, search as string);
        res.status(200).json({services: services[1], count: services[0]});
    }else if(req.method === "PUT"){
        const { name, desciption, price } = req.body;
        if(!req.query.id){
            res.status(422).json({ message: 'Не передан id'});
            return;
        }
        const id = req.query.id as string;
        if(!validate({ name, desciption, price, res })) {
            return;
        }
        const price1 = parseInt(price);
        if(price1 === 0){
            res.status(422).json({ message: 'Цена не может быть 0'});
            return;
        }
        await updateService(id, name, desciption, price1);
        res.status(201).json({ message: 'Услуга успешно создана'});
    }else if(req.method === "DELETE"){
        if(!req.query.id){
            res.status(422).json({ message: 'Не передан id'});
            return;
        }
        const id = req.query.id as string;
        await deleteService(id);
        res.status(201).json({ message: 'Услуга успешно удалена'});
    }  else {
        res.status(500).json({ message: 'Route not valid' });
    }
}

const createService = async (name: string, description: string, price: number) => {
    return await prisma.service.create({
        data: {
            name,
            description,
            price,
        }
    });
}


function validate({ name, desciption, price, res }:any) {
    if(!name){
        res.status(422).json({ message: 'Имя не может быть пустым'});
        return false
    }
    if(!desciption){
        res.status(422).json({ message: 'Описание не может быть пустым'});
        return false
    }
    if(!price){
        res.status(422).json({ message: 'Цена не может быть пустой'});
        return false
    }
    return true
}
