import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getPasswordByUserId, getUserByEmail } from "@/models/user";
const bcrypt = require('bcrypt');

// @ts-ignore
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
        maxAge: 14 * 24 * 60 * 60, // 14 days
    },
    session:{
        strategy: "jwt",
    },
    // callbacks: {
    //     async session({session, user, token}) {
    //         if(user.email === "admin@microhost1.ru"){
    //             session.user.role = "admin";
    //         }
    //         return session;
    //     }
    // }
}
export default NextAuth(authOptions)

export {authOptions}
