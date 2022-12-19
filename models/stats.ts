import prisma from "@/lib/prismadb";

export const IncomeInDay = async () => {
    const hosts = await prisma.orderHost.findMany({
        where: {
            createdAt:{
                gte: new Date(new Date().setHours(0, 0, 0, 0)),
                lte: new Date(new Date().setHours(23, 59, 59, 999)),
            }
        },
        include:{
            host: true,
        }
    });
    const services = await prisma.orderService.findMany({
        where: {
            createdAt:{
                gte: new Date(new Date().setHours(0, 0, 0, 0)),
                lte: new Date(new Date().setHours(23, 59, 59, 999)),
            }
        },
        include:{
            service: true,
        }
    });
    let income = 0;
    hosts.forEach(host => {
        income += host.host.price;
    }
    );
    services.forEach(service => {
        income += service.service.price;
    }
    );
    const lastDay = await IncomeInLastDay();
    let percent = (100*lastDay)/income;
    if(lastDay === 0 || income === 0){
        percent = 100;
    }
    if(income < lastDay){
        percent = -percent;
    }
    return {income: income, percent: percent};
}

//income in last day
export const IncomeInLastDay = async () => {
    const hosts = await prisma.orderHost.findMany({
        where: {
            createdAt:{
                gte: new Date(new Date().setHours(0, 0, 0, 0) - 86400000),
                lte: new Date(new Date().setHours(23, 59, 59, 999) - 86400000),
            }
        },
        include:{
            host: true,
        }
    });
    const services = await prisma.orderService.findMany({
        where: {
            createdAt:{
                gte: new Date(new Date().setHours(0, 0, 0, 0) - 86400000),
                lte: new Date(new Date().setHours(23, 59, 59, 999) - 86400000),
            }
        },
        include:{
            service: true,
        }
    });
    let income = 0;
    hosts.forEach(host => {
        income += host.host.price;
    }
    );
    services.forEach(service => {
        income += service.service.price;
    }
    );

    return income;
}


export const IncomeInMonth = async () => {
    const hosts = await prisma.orderHost.findMany({
        where: {
            createdAt:{
                gte: new Date(new Date().setDate(1)),
                lte: new Date(new Date().setDate(31)),
            }
        },
        include:{
            host: true,
        }
    });
    const services = await prisma.orderService.findMany({
        where: {
            createdAt:{
                gte: new Date(new Date().setDate(1)),
                lte: new Date(new Date().setDate(31)),
            }
        },
        include:{
            service: true,
        }
    });
    let income = 0;
    hosts.forEach(host => {
        income += host.host.price;
    }
    );
    services.forEach(service => {
        income += service.service.price;
    }
    );
    const lastMounth = await IncomeInLastMonth();
    let percent = (100*lastMounth)/income;
    if(lastMounth === 0 || income === 0){
        percent = 100;
    }
    if(income < lastMounth){
        percent = -percent;
    }
    return {income: income, percent: percent};
}

export const IncomeInLastMonth = async () => {
    const hosts = await prisma.orderHost.findMany({
        where: {
            createdAt:{
                gte: new Date(new Date().setDate(1) - 2592000000),
                lte: new Date(new Date().setDate(31) - 2592000000),
            }
        },
        include:{
            host: true,
        }
    });
    const services = await prisma.orderService.findMany({
        where: {
            createdAt:{
                gte: new Date(new Date().setDate(1) - 2592000000),
                lte: new Date(new Date().setDate(31) - 2592000000),
            }
        },
        include:{
            service: true,
        }
    });
    let income = 0;
    hosts.forEach(host => {
        income += host.host.price;
    }
    );
    services.forEach(service => {
        income += service.service.price;
    }
    );
    return income;
}

export const OrdersInDay = async () => {
    const hosts = await prisma.orderHost.findMany({
        where: {
            createdAt:{
                gte: new Date(new Date().setHours(0, 0, 0, 0)),
                lte: new Date(new Date().setHours(23, 59, 59, 999)),
            }
        },
    });
    const services = await prisma.orderService.findMany({
        where: {
            createdAt:{
                gte: new Date(new Date().setHours(0, 0, 0, 0)),
                lte: new Date(new Date().setHours(23, 59, 59, 999)),
            }
        },
    });
    const lastDay = await OrdersInLastDay();
    let percent = (100*lastDay)/(hosts.length + services.length);
    if(lastDay === 0 || (hosts.length + services.length) === 0){
        percent = 100;
    }
    if((hosts.length + services.length) < lastDay){
        percent = -percent;
    }
    return {orders: hosts.length + services.length, percent: percent};
}

export const OrdersInLastDay = async () => {
    const hosts = await prisma.orderHost.findMany({
        where: {
            createdAt:{
                gte: new Date(new Date().setHours(0, 0, 0, 0) - 86400000),
                lte: new Date(new Date().setHours(23, 59, 59, 999) - 86400000),
            }
        },
    });
    const services = await prisma.orderService.findMany({
        where: {
            createdAt:{
                gte: new Date(new Date().setHours(0, 0, 0, 0) - 86400000),
                lte: new Date(new Date().setHours(23, 59, 59, 999) - 86400000),
            }
        },
    });
    return hosts.length + services.length;
}


export const OrdersInWeek = async () => {
    const datas = []
    for(let i = 0; i < 7; i++){
        let date = new Date();
        date.setDate(date.getDate() - i);
        let hosts = await prisma.orderHost.findMany({
            where: {
                createdAt:{
                    gte: new Date(date.setHours(0, 0, 0, 0)),
                    lte: new Date(date.setHours(23, 59, 59, 999)),
                }
            },
        });
        let services = await prisma.orderService.findMany({
            where: {
                createdAt:{
                    gte: new Date(date.setHours(0, 0, 0, 0)),
                    lte: new Date(date.setHours(23, 59, 59, 999)),
                }
            },
        });
        let orders = 0;
        orders = hosts.length + services.length;
        let day = date.getDay();
        let dateName = "Понедельник";
        switch(day){
            case 0:
                dateName = "Воскресенье";
                break;
            case 1:
                dateName = "Понедельник";
                break;
            case 2:
                dateName = "Вторник";
                break;
            case 3:
                dateName = "Среда";
                break;
            case 4:
                dateName = "Четверг";
                break;
            case 5:
                dateName = "Пятница";
                break;
            case 6:
                dateName = "Суббота";
                break;
        }
        datas.push({
            day: dateName,
            orders: orders,
        });
    }
    return datas;
}
