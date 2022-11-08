import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb"

const authOptions = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register',
        error: '/auth/error',
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    type: "email",
                },
                password: {type: "password" },
            },
            async authorize() {
                return {
                    id: 1,
                    name: "J Smith",
                    email: "jsmith@example.com",
                    image: "https://i.pravatar.cc/150?u=jsmith@example.com",
                }
            },
        }),
    ],
}
export default NextAuth(authOptions)

export {authOptions}