// import { Category } from "@prisma/client";
import prisma from "@/lib/prismadb";


export const createService = async (name: string, description: string, price: number) => {
    return await prisma.service.create({
        data: {
            name,
            description,
            price,
        }
    });
}

export const getAllServices = async () => {
    return await prisma.service.findMany();
}

export const updateService = async (id: string, name: string, description: string, price: number) => {
    return await prisma.service.update({
        where: {
            id: id
        },
        data: {
            name,
            description,
            price,
        }
    });
}

export const deleteService = async (id: string) => {
    return await prisma.service.delete({
        where: {
            id: id
        }
    });
}

export const getAvaliableService = async(idUser: string) => {
    return await prisma.service.findMany({
        where: {
           Order: {
                every: {
                    NOT: {
                        userId: idUser
                    }
                }
           }
        },
        select: {
            name: true,
            price: true,
            description: true,
        }
    });
}

export const getUserService = async(idUser: string) => {
    return await prisma.service.findMany({
        where: {
           Order: {
                every: {
                    userId: idUser
                }
           }
        },
        select: {
            name: true,
            price: true,
            description: true,
        }
    });
}
    
// export const getServiceByUserIdHost = async (userId: string) => {
//     return await prisma.services.findMany({
//         where: {
//             userId,
//             category: Category.HOST,
//         },
//         select: {
//             id: true,
//             name: true,
//             price: true,
//             category: true,
//             userId: true,
//             host:{
//                 select: {
//                     id: true,
//                     name: true,
//                     cpu: true,
//                     ram: true,
//                     storage: true,
//                 },
//             }
//         }
//     });
// }

// export const getServiceByUserId = async (userId: string) => {
//     return await prisma.services.findMany({
//         where: {
//             userId,
//             category: Category.SERVICE,
//         },
//         select: {
//             id: true,
//             name: true,
//             price: true,
//             category: true,
//             userId: true,
//             description: true,
//         }
//     });
// }

//TODO BuyService



