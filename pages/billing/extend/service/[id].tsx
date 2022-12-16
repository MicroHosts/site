import BillingLayout from "@/layouts/Billing"
import { errorToast, successToast } from "@/utils/utils";
import { ReactElement } from "react"
import { mutate } from "swr";
import prisma from "@/lib/prismadb"
import { getSession } from "next-auth/react";
import { getUserByEmail } from "@/models/user";

function BuyService({ service }: any) {
    const onBuy = async (months: number) => {
        const res = await fetch("/api/extend/service", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    orderId: service.id,
                    mounth: months
                }
            )
        });
        const data = await res.json();
        if (res.status !== 200) {
            errorToast(data.message);
        } else if (res.status === 200) {
            successToast("Вы успешно продлили услугу!");
            await mutate('/api/user')
            //TODO check
            await mutate('/api/user/service')
        } else {
            errorToast("Что-то пошло не так");
        }
    }

    return (
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                    <div className="flex flex-row">
                        <h2 className="mb-2 leading-tight tracking-tight font-bold text-white text-2xl md:text-3xl">{service.service.name}</h2>
                    </div>
                    <p className="text-white">{service.service.description}</p>
                    <div className="flex flex-col mt-12">
                        <button type="button" onClick={async () => {
                            await onBuy(1)
                        }}
                            className="focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-xl text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">Продлить на месяц {service.service.price} рублей
                        </button>
                        <button type="button" onClick={async () => {
                            await onBuy(2)
                        }}
                            className="focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-xl text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">Продлить на 6 месяцев {Math.round((service.service.price * 6 * 90)/100)} рублей - 10%
                        </button>
                        <button type="button" onClick={async () => {
                            await onBuy(3)
                        }}
                            className="focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-xl text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">Продлить на 1 год {Math.round((service.service.price * 12 * 80)/100)} рублей - 20%
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

BuyService.getLayout = function getLayout(page: ReactElement) {
    return (
        <BillingLayout>
            {page}
        </BillingLayout>
    )
}

export const getServerSideProps = async (context: any) => {
    const { params, req } = context;
    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: { destination: "/" },
        };
    }
    const user = await getUserByEmail(session.user?.email);
    if (!user) {
        return {
            redirect: { destination: "/" },
        };
    }
    const service = await getServiceByUserId(params.id, user.id);
    if (!service) {
        return {
            redirect: { destination: "/billing/" },
        };
    }
    return {
        props: {
            service: service
        }
    }
}



const getServiceByUserId = async (id: string, userId: string) => {
    return await prisma.orderService.findFirst({
        where: {
            id: id,
            userId: userId
        },
        select: {
            id: true,
            service: {
                select: {
                    name: true,
                    description: true,
                    price: true
                }
            }
        }
    });
}



export default BuyService
