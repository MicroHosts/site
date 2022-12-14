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
        var data = `${process.env.PUBLIC_KEY}:${AMOUNT}:${process.env.PRIVATE_KEY2}:${MERCHANT_ORDER_ID}`;
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
//         const user = await getUserById(getPayment.userId);
//         const mailData = {
//             from: 'no-reply@microhost1.ru',
//             to: user!.email,
//             subject: 'Покупка хостинга',
//             text: 'Поздравляем с покупкой хостинга',
//             html: '<p>Поздравляем с покупкой хостинга</p>',
//             amp: `
//             <!doctype html>
// <html ⚡4email>
// <head>
//   <meta charset="utf-8">
//   <style amp4email-boilerplate>body{visibility:hidden}</style>
//   <script async src="https://cdn.ampproject.org/v0.js"></script>
//   <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
// </head>
// <body>
// <p>IP 192.168.0.1</p>
// <p>Логин: sshLogin</p>
// <p>Пароль: example</p>
// </body>
// </html>
// `

        // }
        // await client.sendMail(mailData, function (err, info) {
        //     if (err)
        //         console.log(err)
        //     else
        //         console.log(info);
        // });
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