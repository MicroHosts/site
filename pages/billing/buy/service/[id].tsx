import BillingLayout from "@/layouts/Billing"
import { errorToast, successToast } from "@/utils/utils";
import { ReactElement } from "react"
import { mutate } from "swr";
import prisma from "@/lib/prismadb"
import {getSession} from "next-auth/react";
import { getUserByEmail } from "@/models/user";

function BuyService({ service }: any) {
    const onBuy = async (months: number) => {
        const res = await fetch("/api/buy/service", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    serviceid: service.id,
                    mounth: months
                }
            )
        });
        const data = await res.json();
        if (res.status !== 200) {
            errorToast(data.message);
        } else if (res.status === 200) {
            successToast("Вы успешно купили сервис!\n Напишите нашу группу вк");
            await mutate('/api/user')
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
                        <h2 className="mb-2 leading-tight tracking-tight font-bold text-white text-2xl md:text-3xl">{service.name}</h2>
                    </div>

                    <p className="text-white">{service.description}</p>
                    <div className="flex flex-col mt-12">
                        <button type="button" onClick={async() => {
                            await onBuy(1)
                        }}
                                className="focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-xl text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">Купить на месяц {service.price} рублей
                        </button>
                        <button type="button" onClick={async() => {
                            await onBuy(2)
                        }}
                                className="focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-xl text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">Купить на 6 месяцев {Math.round((service.price * 6 * 95)/ 100)} рублей - 5%
                        </button>
                        <button type="button" onClick={async () => {
                            await onBuy(3)
                        }}
                                className="focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-xl text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">Купить на 1 год {Math.round((service.price * 12 * 90)/100)} рублей - 10%
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

export async function getServerSideProps(context: any) {
    const { params, req } = context;
    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: { destination: "/" },
        };
    }
    const user = await getUserByEmail(session.user?.email);
    if(!user){
        return {
            redirect: { destination: "/" },
        };
    }
    const service = await getServiceByUserId(params.id, user.id);
    if(!service){
        return {
            redirect: { destination: "/billing/buy" },
        };
    }
    return {
        props: {
            service: service
        }
    }
}


const getServiceByUserId = async (id: string, userId: string) => {
    return await prisma.service.findFirst({
        where: {
            id: id,
            Order: {
                every: {
                    NOT: {
                        userId: userId
                    }
                }
            }
        },
        include:{
            Order: true
        }
    });
}



export default BuyService