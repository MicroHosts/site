import {NextApiRequest, NextApiResponse} from "next";
import { getPaymentById } from "@/models/payment";
import prisma from "@/lib/prismadb";

const requestIp = require('request-ip');
const crypto = require('crypto');


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const clientIp = requestIp.getClientIp(req);
        const ips = ["168.119.157.136", "168.119.60.227", "138.201.88.124", "178.154.197.79"]
        if (!ips.includes(clientIp)) {
            res.status(401).json({ message: "Unauthorized." });
            return;
        }
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
        await addBalance(getPayment.userId, getPayment.amount);
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


export const addBalance = async (userId: string, amount: number) => {
    return await prisma.balance.update({
        where: {
            userId: userId
        },
        data: {
            amount: {
                increment: amount
            }
        }
    });
}
