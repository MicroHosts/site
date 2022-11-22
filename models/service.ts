// import { Category } from "@prisma/client";
import prisma from "@/lib/prismadb";

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


export const createHost = async(
    hostName: string, 
    cpuInfo: string,
    ramInfo: string,
    storageInfo: string,
    idproxmox: number,
    login: string,
    password: string,
    ip: string,
    desciption: string,
    price: number,
    ) => {

    return await prisma.host.create({
        data: {
            name: hostName,
            cpu: cpuInfo,
            ram: ramInfo,
            storage: storageInfo,
            vimid: idproxmox,
            login: login,
            password: password,
            ip: ip,
            description: desciption,
            price: price,
        },
    });
}

//TODO UpdateHost
//TODO DeleteHost

//TODO BuyHost
//TODO BuyService



