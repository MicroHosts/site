import prisma from "../lib/prismadb";
import {makeid} from "../utils/utils";

const bcrypt = require('bcrypt');


export const getUserByEmail = async (email: string) => {
    return await prisma.user.findFirst({
        where: {
            email
        },
        select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
        }
    });
}

export const getUserByName = async (name: string) => {
    const user = await prisma.user.findUnique({
        where: {
            name,
        },
        select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
        }
    });
    return user;
}

export const createUser = async (name: string, email: string, password: string) => {
    //check exists
    const user1 = await getUserByEmail(email);
    if(user1){
        return null;
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
        }
    });
    await prisma.password.create({
        data: {
            salt: salt,
            hashed: passwordHashed,
            user: {
                connect: {
                    id: user.id
                }
            }
        }
    });
    const token = makeid(32);
    await prisma.verificationToken.create({
        data: {
            token: token,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            user: {
                connect: {
                    id: user.id
                }
            }
        }
    });
    return token;
}

export const verifyUser = async (token: string) => {
    const verificationToken = await prisma.verificationToken.findUnique({
        where: {
            token: token
        }
    });
    if (verificationToken && verificationToken.expires > new Date()) {
        await prisma.user.update({
            where: {
                id: verificationToken.userId
            },
            data: {
                emailVerified: true
            }
        });
        //delete token
        await prisma.verificationToken.delete({
            where: {
                token: token
            }
        });
        return true;
    }
    return false;
}

export const getPasswordByUserId = async (userId: string) => {
    const password = await prisma.password.findUnique({
        where: {
            userId: userId
        }
    });
    return password;
}
