import prisma from "@/lib/prismadb";


export const getPaymentById = async (
    id: string,
) => {
    return await prisma.payment.findUnique({
        where: {
            id: id,
        },
    });
}
