import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@/auth/[...nextauth]"
import { getUserByEmail } from '@/models/user';
import prisma from "@/lib/prismadb";

const bcrypt = require('bcrypt');

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed." });
        return;
    }
    const { password, newPassword } = req.body;
    if (!password || password.length < 6) {
        res.status(422).json({ message: 'Некорректный пароль' });
        return;
    }
    if (!newPassword || newPassword.length < 6) {
        res.status(422).json({ message: 'Некорректный новый пароль' });
        return;
    }
    const user = await checkPasswordAndNewPassword(session.user?.email as string, password, newPassword);
    if (!user) {
        res.status(400).json({ message: "Не удалось изменить пароль" });
        return;
    }
    const result = await changePasswordByEmail(session.user?.email as string, newPassword);
    if (!result) {
        res.status(400).json({ message: "Не удалось изменить пароль" });
        return;
    }
    res.status(200).json({ message: "Пароль успешно изменен" });
}


export const checkPasswordAndNewPassword = async (email: string, password: string, newPassword: string) => {
    if (!password || !newPassword) {
        return null;
    }
    if (password === newPassword) {
        return null;
    }
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        include: {
            password: true,
        }
    })
    if (!user) {
        return null;
    }
    const isMatch = await bcrypt.compare(password, user.password!!.hashed);
    if (!isMatch) {
        return null;
    }
    return true;
}

export const changePasswordByEmail = async (email: string, password: string) => {
    if (!email) {
        return null;
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await getUserByEmail(email);
    if (!user) {
        return null;
    }
    return await prisma.password.update({
        where: {
            userId: user.id,
        },
        data: {
            hashed: hash,
            salt: salt
        }
    })
}
