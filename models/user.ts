import prisma from "@/lib/prismadb";
import {makeid} from "@/utils/utils";

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

export const getUserByName = async (name: string | null | undefined) => {
    if(!name){
        return null;
    }
    return await prisma.user.findUnique({
        where: {
            name,
        },
        select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            balance: {
                select: {
                    amount: true,
                }
            },

        },
    });
}

export const getUserInfo = async (id: string) => {
    return await prisma.userInfo.findFirst({
        where: {
            userId: id
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            second_name: true,
            phone_number: true,
        },
    });
}

export const updateUserInfo = async (id: string, {data}: any) => {
    return await prisma.userInfo.update({
        where: {
            id,
        },
        data:{
            first_name: data.first_name,
            last_name: data.last_name,
            second_name: data.second_name,
            phone_number: data.phone_number,
        },
 })
};

export const createUser = async (name: string, email: string, password: string) => {
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
        await prisma.balance.create({
            data: {
                amount: 0,
                user: {
                    connect: {
                        id: verificationToken.userId
                    }
                }
            }
        })
        await prisma.userInfo.create({
            data:{
                user: {
                    connect: {
                        id: verificationToken.userId
                    }
                },
                second_name: "",
                first_name: "",
                last_name: "",
                phone_number: "",
            }
        })
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
