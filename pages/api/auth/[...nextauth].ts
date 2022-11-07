import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
    providers: [
        CredentialsProvider({
                name: "Credentials",
                credentials: {
                    username: {
                        label: "Username",
                        type: "text",
                        placeholder: "jsmith",
                    },
                    password: { label: "Password", type: "password" },
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
})