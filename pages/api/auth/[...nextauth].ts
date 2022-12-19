import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {getUserByEmail} from "@/models/user";
import prisma from "@/lib/prismadb";

const bcrypt = require('bcrypt');

const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    type: "email",
                },
                password: {type: "password" },
            },
            async authorize(credentials, req) {
                if (credentials && credentials.email && credentials.password) {
                    const user = await getUserByEmail(credentials.email);
                    if(!user){
                       throw new Error("Пользователь не найден");
                    }
                    if(!user?.emailVerified){
                        throw new Error("Почта не подтверждена");
                    }
                    if(!user.blocked){
                        throw new Error("Пользователь заблокирован");
                    }
                    const password = await getPasswordByUserId(user.id);
                    if (password === null){
                        throw new Error("Пароль не найден");
                    }
                    const passwordValid = await bcrypt.compare(credentials.password, password.hashed);
                    if (passwordValid) {
                        return user;
                    }else{
                        throw new Error("Неверный пароль");
                    }
                }else{
                    return null;
                }
            },
        }),
    ],
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge:  30 * 60 ,
    },
    session:{
        strategy: "jwt",
    },
}

const getPasswordByUserId = async (userId: string) => {
    return await prisma.password.findUnique({
        where: {
            userId: userId
        }
    });
}

export default NextAuth(authOptions)

export {authOptions}
