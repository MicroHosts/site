import prisma from "@/lib/prismadb";


export const getHostById = async (id: string) => {
    return await prisma.host.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            storage: true,
            cpu: true,
            ram: true,
            description: true,
            price: true,
            vimid: true,
            Order: {
                select: {
                    id: true,
                    rentDate: true,

                }
            }
        },
    });
}

export const getHostByOrderHost = async (id: string) => {
    return await prisma.orderHost.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            rentDate: true,
            host: {
                select: {
                    id: true,
                    name: true,
                    vimid: true
                }
            }
        }
    })
}

export const getHostByUserId = async (id: string) => {
    return await prisma.host.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            storage: true,
            cpu: true,
            ram: true,
            description: true,
            price: true,
            Order: {
                select: {
                    id: true,
                    rentDate: true,

                }
            }
        },
    });
}


// export const getHostByIdServer = async(id : string) => {
//     return await prisma.client
// }




export const getAvaliableMainPageHosts = async () => {
    const hosts = await prisma.host.findMany({
        where: {
            Order: null,
        },
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            cpu: true,
            ram: true,
            storage: true,
        }
    });
    if (!hosts) {
        return []
    }
    return hosts.slice(0, 3);
}


export const checkIsUserHost = async (userId: string, hostId: string) => {
    return await prisma.orderHost.findFirst({
        where: {
            userId: userId,
            hostId: hostId,
            rentDate: {
                lt: new Date(),
            }
        }
    });
}
