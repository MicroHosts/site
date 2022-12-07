import { NextApiRequest, NextApiResponse } from "next";
import { addBalance, getUserIdByEmail } from "@/models/user";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@/auth/[...nextauth]";

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
        const balance = await addBalance(user.id, price);
        res.status(200).json({ message: 'Баланс успешно обновлен' });
    }
}

