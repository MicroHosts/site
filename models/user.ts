import prisma from "@/lib/prismadb";
import { makeid } from "@/utils/utils";

const bcrypt = require('bcrypt');

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

        },
    });
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
        include:{
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

export const updateUserInfo = async (id: string, { data }: any) => {
    return await prisma.userInfo.update({
        where: {
            userId: id,
        },
        data: {
            first_name: data.first_name,
            last_name: data.last_name,
            second_name: data.second_name,
            phone_number: data.phone_number,
        },
    })
};

export const createUser = async (name: string, email: string, password: string) => {
    const user1 = await getUserByEmail(email);
    if (user1) {
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

export const createRecovery = async (email: string) => {
    const user = await getUserByEmail(email);
    if (!user) {
        return null;
    }
    //check if token exists
    const token1 = await prisma.recoveryToken.findFirst({
        where: {
            userId: user.id
        }
    });
    if (token1) {
        return token1.token;
    }
    const token = makeid(32);
    await prisma.recoveryToken.create({
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
            data: {
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
    } else if (verificationToken && verificationToken.expires < new Date()) {
        await prisma.verificationToken.delete({
            where: {
                token: token
            }
        });
    }
    return false;
}

export const changePassword = async (token: string, password: string) => {
    const recoveryToken = await prisma.recoveryToken.findUnique({
        where: {
            token: token
        }
    });
    if (recoveryToken && recoveryToken.expires > new Date()) {
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, salt);
        await prisma.password.update({
            where: {
                userId: recoveryToken.userId
            },
            data: {
                salt: salt,
                hashed: passwordHashed,
            }
        });
        await prisma.recoveryToken.delete({
            where: {
                token: token
            }
        });
        return true;
    } else if (recoveryToken && recoveryToken.expires < new Date()) {
        await prisma.recoveryToken.delete({
            where: {
                token: token
            }
        });
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


//Admin

export const getAllUsers = async (page: number, search: string) => {
    return await prisma.$transaction([
        prisma.user.count({
            where: {
                name: {
                    contains: search,
                }
            },
        }),
        prisma.user.findMany({
            take: 5,
            skip: (page - 1) * 5,
            orderBy: {
                id: "desc",
            },
            select: {
                id: true,
                name: true,
                email: true,
                emailVerified: true,
                blocked: true,
            },
            where: {
                name: {
                    contains: search,
                }
            },
        })
    ])
}

export const getUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            blocked: true,
            hosts: {
                select: {
                    id: true,
                    host: {
                        select: {
                            id: true,
                            name: true,
                            vimid: true,
                            price: true,
                        }
                    },
                    rentDate: true,
                }
            },
            balance: {
                select: {
                    amount: true,
                }
            },
            info: {
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    second_name: true,
                    phone_number: true,
                }
            },
            services: {
                select: {
                    id: true,
                    rentDate: true,
                    service: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                        }
                    },
                }
            }
        }
    });
}

export const getUserAllId = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
        }
    });
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


export const addBalance = async (userId: string, amount: number) => {
    return await prisma.balance.update({
        where: {
            userId: userId
        },
        data: {
            amount: {
                increment: amount
            }
        }
    });
}

export const removeBalance = async (userId: string, amount: number) => {
    return await prisma.balance.update({
        where: {
            userId: userId
        },
        data: {
            amount: {
                decrement: amount
            }
        }
    });
}


export const createAdmin = async (username: string, email: string, password: string) => {
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);
    await prisma.user.create({
        data: {
            email: email,
            name: username,
            password: {
                create: {
                    salt: salt,
                    hashed: passwordHashed,
                }
            },
            emailVerified: true,
            role: "ADMIN",
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
