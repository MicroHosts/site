import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getPasswordByUserId, getUserByEmail } from "../../../models/user";
const bcrypt = require('bcrypt');

const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register',
        error: '/auth/error',
    },
    events: {
        createUser(message) {
            
        },
    },
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
                        return null;
                    }
                    if(!user?.emailVerified){
                        throw new Error("Email not verified");
                    }
                    const password = await getPasswordByUserId(user.id);
                    if (password === null){
                        throw new Error("Password not found");
                    }
                    const passwordValid = await bcrypt.compare(credentials.password, password.hashed);
                    if (passwordValid) {
                        return user;
                    }else{
                        throw new Error("Invalid password");
                    }
                }else{
                    return null;
                }

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