import {NextApiRequest, NextApiResponse} from "next";
import { getPaymentById } from "@/models/payment";
import prisma from "@/lib/prismadb";
import FormData from "form-data";

const requestIp = require('request-ip');
const crypto = require('crypto');


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        // const clientIp = requestIp.getClientIp(req);
        // const ips = ["168.119.157.136", "168.119.60.227", "138.201.88.124", "178.154.197.79"]
        // if (!ips.includes(clientIp)) {
        //     res.status(401).json({ message: "Unauthorized." });
        //     return;
        // }
        const {MERCHANT_ID, AMOUNT, MERCHANT_ORDER_ID, SIGN} = req.body
        if(MERCHANT_ID !== process.env.PUBLIC_KEY) {
            res.status(401).json({ message: "Unauthorized." });
            return;
        }
        if(!AMOUNT){
            res.status(401).json({ message: "Unauthorized." });
            return;
        }
        if(!MERCHANT_ORDER_ID){
            res.status(401).json({ message: "Unauthorized." });
            return;
        }
        if(!SIGN){
            res.status(401).json({ message: "Unauthorized." });
            return;
        }
        const data = `${process.env.PUBLIC_KEY}:${AMOUNT}:${process.env.PRIVATE_KEY2}:${MERCHANT_ORDER_ID}`;
        const sign = crypto.createHash('md5').update(data).digest("hex");
        if(sign !== SIGN) {
            res.status(401).json({ message: "Unauthorized." });
            return;
        }
        const getPayment = await getPaymentById(MERCHANT_ORDER_ID);
        if(!getPayment) {
            res.status(401).json({ message: "Unauthorized." });
            return;
        }
        await PaymentPaid(MERCHANT_ORDER_ID);
        var formData = new URLSearchParams();
        formData.append("uid", getPayment.userId);
        formData.append("amt", getPayment.amount+"");
        const m = new Date();
        formData.append("date", ("0" + m.getUTCDate()).slice(-2) +"/"+("0" + (m.getUTCMonth()+1)).slice(-2)+"/"+ m.getUTCFullYear());
        formData.append("time", ("0" + m.getUTCHours()).slice(-2) + ":" +
            ("0" + m.getUTCMinutes()).slice(-2) + ":" +
            ("0" + m.getUTCSeconds()).slice(-2))
        formData.append("gateway", "freekassa");


        const response = await fetch(`https://churkahost.float-zone.com:4085/index.php?act=addtransaction&api=json&adminapikey=${process.env.API_KEY}&adminapipass=${process.env.KEY_PASS}`,
            {
                method: "POST",
                //     headers:{
                //         'Content-Type': 'application/x-www-form-urlencoded'
                //     },
                // @ts-ignore
                body: formData
            }
        )
        res.status(201).json({ message: 'Баланс пополнен'});
    }
}

const PaymentPaid = async (
    id: string,
) => {
    return await prisma.payment.update({
        where: {
            id: id,
        },
        data: {
            paid: true,
        },
    });
}
