import {NextApiRequest, NextApiResponse} from "next";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "@/auth/[...nextauth]";
import prisma from "@/lib/prismadb";
import {getUserByEmail} from "@/models/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if(!session){
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    const user = await getUserByEmail(session.user?.email);
    if(!user){
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    if(user.role !== "ADMIN"){
        res.status(401).json({ message: "You must be admin." });
        return;
    }
    if (req.method === 'POST') {
    }else if(req.method === "GET"){
        let page = req.query.page ? req.query.page : 1
        const search = req.query.search ? req.query.search : '';
        const caterory = req.query.category ? req.query.category : '';
        let logs: any
        switch (caterory) {
            case "host":
                logs = await getByCategory(page as number, search as string, "host");
                break;
            case "service":
                logs = await getByCategory(page as number, search as string, "service");
                break;
            case "expend":
                logs = await getByCategory(page as number, search as string, "expend");
                break;
            case "buy":
                logs = await getByCategory(page as number, search as string, "buy");
                break;
            default:
                logs = await getAll(page as number, search as string);
                break;
        }
        res.status(200).json({logs: logs[1], count: logs[0]});
    }else if(req.method === "DELETE"){
    }
}

export const getByCategory = async (page: number, search: string, category: string) => {
    switch (category) {
        case "host":
            return await prisma.$transaction([
                prisma.buyList.count({
                    where: {
                        name: {
                            contains: search,
                        },
                        type: "HOST",
                    },
                }),
                prisma.buyList.findMany({
                    take: 5,
                    skip: (page - 1) * 5,
                    orderBy: {
                        id: "desc",
                    },
                    select: {
                        id: true,
                        name: true,
                        rentDate: true,
                        status: true,
                        price: true,
                        type: true,
                        user: {
                            select: {
                                email: true,
                            },
                        }
                    },
                    where: {
                        name: {
                            contains: search,
                        },
                        type: "HOST",
                    },
                })
            ])
        case "service":
            return await prisma.$transaction([
                prisma.buyList.count({
                    where: {
                        name: {
                            contains: search,
                        },
                        type: "SERVICE",
                    },
                }),
                prisma.buyList.findMany({
                    take: 5,
                    skip: (page - 1) * 5,
                    orderBy: {
                        id: "desc",
                    },
                    select: {
                        id: true,
                        name: true,
                        rentDate: true,
                        status: true,
                        price: true,
                        type: true,
                        user: {
                            select: {
                                email: true,
                            },
                        }
                    },
                    where: {
                        name: {
                            contains: search,
                        },
                        type: "SERVICE",
                    },
                })
            ])
        case "expend":
            return await prisma.$transaction([
                prisma.buyList.count({
                    where: {
                        name: {
                            contains: search,
                        },
                        status: "EXPEND",
                    },
                }),
                prisma.buyList.findMany({
                    take: 5,
                    skip: (page - 1) * 5,
                    orderBy: {
                        id: "desc",
                    },
                    select: {
                        id: true,
                        name: true,
                        rentDate: true,
                        status: true,
                        price: true,
                        type: true,
                        user: {
                            select: {
                                email: true,
                            },
                        }
                    },
                    where: {
                        name: {
                            contains: search,
                        },
                        status: "EXPEND",
                    },
                })
            ])
        case "buy":
            return await prisma.$transaction([
                prisma.buyList.count({
                    where: {
                        name: {
                            contains: search,
                        },
                        status: "BUY",
                    },
                }),
                prisma.buyList.findMany({
                    take: 5,
                    skip: (page - 1) * 5,
                    orderBy: {
                        id: "desc",
                    },
                    select: {
                        id: true,
                        name: true,
                        rentDate: true,
                        status: true,
                        price: true,
                        type: true,
                        user: {
                            select: {
                                email: true,
                            },
                        }
                    },
                    where: {
                        name: {
                            contains: search,
                        },
                        status: "BUY",
                    },
                })
            ])
        }
}

export const getAll = async (page: number, search: string) => {
    return await prisma.$transaction([
        prisma.buyList.count({
            where: {
                name: {
                    contains: search,
                },
            },
        }),
        prisma.buyList.findMany({
            take: 5,
            skip: (page - 1) * 5,
            orderBy: {
                id: "desc",
            },
            select: {
                id: true,
                name: true,
                rentDate: true,
                status: true,
                price: true,
                type: true,
                user: {
                    select: {
                        email: true,
                    },
                }
            },
            where: {
                name: {
                    contains: search,
                },
            },
        })
    ])
}

