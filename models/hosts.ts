import prisma from "@/lib/prismadb";

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

export const updateHost = async(
    id: string,
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
    return await prisma.host.update({
        where: {
            id: id,
        },
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


// export const getHosts = async() => {
//     return await prisma.host.findMany({
//     });
// }

export const getHostById = async(id: string) => {
    return await prisma.host.findUnique({
        where:{
            id: id,
        }
    });
}

export const deleteHost = async(id: string) => {
    return await prisma.host.delete({
        where:{
            id: id,
        }
    });
}

export const getAvailableHosts = async() => {
    const hosts = await prisma.host.findMany({
        where:{
           Order: null,
        },
        select:{
            id: true,
            name: true,
            description: true,
            price: true,
            cpu: true,
            ram: true,
            storage: true,
        }
    });
    if(!hosts){
        return []
    }
    return hosts.slice(0, 3);
}

export const getHostsByUserId = async(userId: string) => {
    return await prisma.orderHost.findMany({
        where:{
            userId: userId,
        },
        select:{
            id: true,
            rentDate: true,
            host: {
                select: {
                    name: true,
                    description: true,
                    price: true,
                }
            }
        }
    });
}
//TODO BuyHost
export const buyHost = async(userId: string, hostId: string) => {
    let date = new Date();
    date.setMonth(date.getMonth() + 1);
    return await prisma.orderHost.create({
        data: {
            userId: userId,
            hostId: hostId,
            rentDate: date,
        },
    });
}

export const removeHost = async(userId: string, hostId: string) => {
    return await prisma.orderHost.delete({
        where:{
                userId: userId,
                hostId: hostId,
        }
    });
}

export const getHosts = async(cursor: string) => {
    return await prisma.$transaction([
        prisma.host.count(),
        prisma.host.findMany({
            take: 5,
            cursor: {
                id: cursor,
            }
        })
    ])
}