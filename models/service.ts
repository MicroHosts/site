import { Category } from "@prisma/client";
import prisma from "@/lib/prismadb";

export const createService = async (data: any) => {
    return await prisma.services.create(data);
}

export const getServiceByUserIdHost = async (userId: string) => {
    return await prisma.services.findMany({
        where: {
            userId,
            category: Category.HOST,
        },
        select: {
            id: true,
            name: true,
            price: true,
            category: true,
            userId: true,
            host:{
                select: {
                    id: true,
                    name: true,
                    cpu: true,
                    ram: true,
                    storage: true,
                },
            }
        }
    });
}

export const getServiceByUserId = async (userId: string) => {
    return await prisma.services.findMany({
        where: {
            userId,
            category: Category.SERVICE,
        },
        select: {
            id: true,
            name: true,
            price: true,
            category: true,
            userId: true,
            description: true,
        }
    });
}



