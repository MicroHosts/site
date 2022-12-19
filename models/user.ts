import prisma from "@/lib/prismadb";

export const getUserByEmail = async (email: string | null | undefined) => {
    if (!email) {
        return null;
    }
    return await prisma.user.findUnique({
        where: {
            email,
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
            blocked: true,
            role: true,
        },
    });
}


export const deleteRecovery = async (token: string) => {
    return await prisma.recoveryToken.delete({
        where: {
            token: token
        }
    });
}

export const verifyRecovery = async (token: string) => {
    const recoveryToken = await prisma.recoveryToken.findFirst({
        where: {
            token: token,
            expires: {
                gt: new Date()
            }
        },
        select: {
            user: {
                select: {
                    id: true,
                    email: true,
                }
            }
        }
    });
    if (!recoveryToken) {
        return null;
    }
    return recoveryToken.user;
}


export const getUserRole = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email: email
        },
        select: {
            role: true
        }
    });
}

export const getUserIdByEmail = async (email: string) => {
    //TODO return null if email not found
    return await prisma.user.findUnique({
        where: {
            email: email
        },
        select: {
            id: true,
            balance: {
                select: {
                    amount: true
                }
            }
        }
    });
}

export const checkAdmin = async () => {
    return await prisma.user.findFirst({
        where: {
            role: "ADMIN"
        },
        select: {
            role: true
        }
    });
}
