import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import FormData from "form-data";
const crypto = require('crypto');

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { price, email } = req.body
        if(!price || !email){
            res.status(500).json({message: "Введите не заполненые поля"});
            return
        }
        if(price <= 0 && price <= 100000){
            res.status(500).json({message: "Пополнения от суммы больше нуля и меньше 100000"});
            return
        }
        var formData  = new URLSearchParams();
        formData.append("email", email);
        const response = await fetch(`https://churkahost.float-zone.com:4085/index.php?act=users&api=json&adminapikey=${process.env.API_KEY}&adminapipass=${process.env.KEY_PASS}`,
            {
                method: "POST",
                //     headers:{
                //         'Content-Type': 'application/x-www-form-urlencoded'
                //     },
                // @ts-ignore
                body: formData
            }
        )
        const json = await response.json();
        if(json.users === null){
            res.status(500).json({message: "Пользователь не найден"});
            return
        }
        const userId = Object.keys(json.users)[0]
        const payment = await createPayment(userId, price);
        const data = `${process.env.PUBLIC_KEY}:${price}:${process.env.PRIVATE_KEY}:RUB:${payment.id}`;
        const hash = crypto.createHash('md5').update(data).digest("hex");
        res.status(200).json({ url: `https://pay.freekassa.ru/?m=${process.env.PUBLIC_KEY}&oa=${price}&o=${payment.id}&s=${hash}&currency=RUB` });
    }
}


const createPayment = async (
    userId: string,
    price: number,
) => {
    return await prisma.payment.create({
        data: {
            userId: userId,
            amount: price,
        },
    });
}
