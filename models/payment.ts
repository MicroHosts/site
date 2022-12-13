import prisma from "@/lib/prismadb";


export const createPayment = async (
    userId: string,
    price: number,
) => {
    return await prisma.payment.create({
        data: {
            userId: userId,
            amount: price,
        },
    });
}

export const getPaymentById = async (
    id: string,
) => {
    return await prisma.payment.findUnique({
        where: {
            id: id,
        },
    });
}

export const PaymentPaid = async (
    id: string,
) => {
    return await prisma.payment.update({
        where: {
            id: id,
        },
        data: {
            paid: true,
        },
    });
}