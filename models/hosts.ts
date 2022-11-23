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
            status: "ACTIVE",
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


export const getHosts = async() => {
    return await prisma.host.findMany({
    });
}

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
    return await prisma.host.findMany({
        where:{
           Order: null,
        },
        select:{
            id: true,
            name: true,
            description: true,
            price: true,
        }
    });
}

//TODO UpdateHost
//TODO DeleteHost

//TODO BuyHost
