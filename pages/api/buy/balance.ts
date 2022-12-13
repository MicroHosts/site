import { NextApiRequest, NextApiResponse } from "next";
import { getUserIdByEmail } from "@/models/user";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@/auth/[...nextauth]";
import { createPayment } from "@/models/payment";
const crypto = require('crypto');

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).json({ message: "Unauthorized." });
        return;
    }
    if (req.method === 'POST') {
        const { price } = req.body
        const user = await getUserIdByEmail(session.user!.email!);
        if (!user) {
            res.status(404).json({ message: "Пользователь не найден" });
            return;
        }
        const payment = await createPayment(user.id, price);
        var data = `${process.env.PUBLIC_KEY}:${price}:${process.env.PRIVATE_KEY}:RUB:${payment.id}`;
        const hash = crypto.createHash('md5').update(data).digest("hex");
        res.status(200).json({ url: `https://pay.freekassa.ru/?m=${process.env.PUBLIC_KEY}&oa=${price}&o=${payment.id}&s=${hash}&currency=RUB` });
    }
}

