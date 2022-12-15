import BillingLayout from "@/layouts/Billing"
import { errorToast, successToast } from "@/utils/utils";
import { ReactElement } from "react"
import { mutate } from "swr";
import prisma from "@/lib/prismadb"
import {getSession} from "next-auth/react";

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
                            await onBuy(6)
                        }}
                                className="focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-xl text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">Купить на 6 месяцев {service.price * 6} рублей
                        </button>
                        <button type="button" onClick={async () => {
                            await onBuy(12)
                        }}
                                className="focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-xl text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">Купить на 1 год {service.price * 12} рублей
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

export async function getStaticPaths() {
    const ids = await getAvaliableServices();
    const paths = ids.map((id: any) => ({
        params: { id: id.id }
    }))
    return {
        paths: paths,
        fallback: false, // can also be true or 'blocking'
    }
}

export async function getStaticProps(context: any) {
    const { params } = context;
    const service = await getServiceByUserId(params.id, "");
    if(!service) {
      return{
          redirect: {
                destination: '/billing',
          }
      }
    }
    return {
        props: {
            service: service
        },
        revalidate: 60
    }
}


const getServiceByUserId = async (id: string, userId: string) => {
    const services = await prisma.service.findMany({
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
    return services[0];
}

const getAvaliableServices = async () => {
    return await prisma.service.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
        },
    })
}


export default BuyService
