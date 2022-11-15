import type { PrismaClient, Prisma, User } from "@prisma/client"
import type { Adapter, AdapterAccount, AdapterSession, AdapterUser } from "next-auth/adapters"

export function PrismaAdapter(p: PrismaClient): Adapter {
  return {
    createUser: (user) => {
        console.log("test1")
        return {id: "1", name: "test", email: "", emailVerified: new Date()}},
    getUser: (id) => {
        console.log(id)
        console.log("test1")
        const user = p.user.findUnique({
            where: {
                id: id
            },
            select:{
                id: true,
                name: true,
                email: true,
                emailVerified: true,
            }
        });
        if(user == null){
            return null;
        }
        const user1 = user as unknown as User;
        return {id: user1.id, name: user1.name, email: user1.email, emailVerified: null};
    },
    getUserByEmail: (email) => {
        console.log("test1")
        const user = p.user.findUnique({
            where: {
                email: email,
            },
            select:{
                id: true,
                name: true,
                email: true,
                emailVerified: true,
            }
        });
        if(user == null){
            return null;
        }
        const user1 = user as unknown as User;
        return {id: user1.id, name: user1.name, email: user1.email, emailVerified: null};
    },
    async getUserByAccount(provider_providerAccountId) {
        console.log("test1")
      return null
    },
    updateUser: ({ id, ...data }) => {
        console.log("test1")
        // if(data.name){
        //     data.name = data.name.toLowerCase();
        // }
        // const user = p.user.update({
        //     where: {
        //         id: id
        //     },
        //     data: {
        //         name: data.name!,
        //         email: data.email,
        //     }
        // });
        // if(user == null){
        //     return null;
        // }
        // const user1 = user as unknown as User;
        return {id: "1", name: "test", email: "", emailVerified: new Date()}
    },
    deleteUser: (id) => {
        console.log("test1")
        return null},
    linkAccount: (data) => {
        console.log("sdsds")
        return null},
    unlinkAccount: (provider_providerAccountId) => {return undefined},
    async getSessionAndUser(sessionToken) { 
        console.log(sessionToken)
        const userAndSession = await p.session.findUnique({
            where: { sessionToken },
            select: {
                user:{
                    select:{
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                expires: true,
                sessionToken: true,
            }
          })
        //   console.log(!userAndSession)
          if (!userAndSession) return null
          const session1 = {sessionToken: userAndSession.sessionToken, expires: userAndSession.expires, userId: userAndSession.user.id} as AdapterSession
          const user1 = {id: userAndSession.user.id, name: userAndSession.user.name, email: userAndSession.user.email, emailVerified: null} as AdapterUser
          return { user: user1, session: session1 }
     },
    createSession: (data) => {
        console.log("test123")
        const session = p.session.create({
            data: {
                sessionToken: data.sessionToken,
                expires: data.expires,
                userId: data.userId,
            }
        });
        return session
    },
    updateSession: (data) => {
        console.log("test1")
        const session = p.session.update({
            where: {
                sessionToken: data.sessionToken
                },
            data: {
                expires: data.expires,
            }
        });
        return session
    },
    deleteSession: (sessionToken) => {
        console.log("test2")
        const session = p.session.delete({
            where: {
                sessionToken: sessionToken
            }
        });
        return session
    },
    async createVerificationToken(data) {
        console.log("sdsds")
        return null
    },
    async useVerificationToken(identifier_token) {
        console.log("sdsds")
        return null
    },
  }
}