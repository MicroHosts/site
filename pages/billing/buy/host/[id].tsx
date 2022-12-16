import BillingLayout from "@/layouts/Billing"
import { errorToast, successToast } from "@/utils/utils";
import { ReactElement } from "react"
import { FaMemory } from "react-icons/fa";
import { FiCpu } from "react-icons/fi";
import { MdStorage } from "react-icons/md";
import { mutate } from "swr";
import prisma from "@/lib/prismadb"
import { getSession } from "next-auth/react";
import { getUserByEmail } from "@/models/user";

function BuyHost({ host }: any) {
    const onBuy = async (months: number) => {
        const res = await fetch("/api/buy/host", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    hostid: host.id,
                    mounth: months
                }
            )
        });
        const data = await res.json();
        if (res.status !== 200) {
            errorToast(data.message);
        } else if (res.status === 200) {
            successToast("Вы успешно купили хост!\n Данные отправлены вам на почту");
            await mutate('/api/user')
            //TODO check
            await mutate('/api/user/host')
        } else {
            errorToast("Что-то пошло не так");
        }
    }

    return (
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                    <div className="flex flex-row">
                        <h2 className="mb-2 leading-tight tracking-tight font-bold text-white text-2xl md:text-3xl">{host.name}</h2>
                    </div>
                    <div className="flex items-center space-x-4 my-4">
                        <ul role="list" className="space-y-5 my-7">
                            <li className="flex space-x-3">
                                <FiCpu className="flex-shrink-0 w-5 h-5 text-blue-500" />
                                <span className="text-base font-normal leading-tight text-gray-400">{host.cpu}</span>
                            </li>
                            <li className="flex space-x-3">
                                <FaMemory className='flex-shrink-0 w-5 h-5 text-blue-500' />
                                <span className="text-base font-normal leading-tight text-gray-400">{host.ram}</span>
                            </li>
                            <li className="flex space-x-3">
                                <MdStorage className="flex-shrink-0 w-5 h-5 text-blue-500" />
                                <span className="text-base font-normal leading-tight text-gray-400">{host.storage}</span>
                            </li>
                        </ul>
                    </div>


                    <p className="text-white">{host.description}</p>
                    <div className="flex flex-col mt-12">
                        <button type="button" onClick={async() => {
                            await onBuy(1)
                        }}
                            className="focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-xl text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">Купить на месяц {host.price} рублей
                        </button>
                        <button type="button" onClick={async() => {
                            await onBuy(2)
                        }}
                            className="focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-xl text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">Купить на 6 месяцев {Math.round((host.price * 6 * 95)/100)} рублей -5%
                        </button>
                        <button type="button" onClick={async () => {
                            await onBuy(3)
                        }}
                            className="focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-xl text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">Купить на 1 год {Math.round((host.price * 12 * 90)/100)} рублей - 10%
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

BuyHost.getLayout = function getLayout(page: ReactElement) {
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
    const host = await getHostById(params.id);
    if(!host){
        return {
            redirect: { destination: "/billing/buy" },
        };
    }
    return {
        props: {
            host: host
        }
    }
}


const getHostById = async (id: string) => {
    return await prisma.host.findFirst({
        where: {
            id: id,
            Order: null,
            NoPayOrder: null,
            ready: true
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


// const getAvailableHostsAll = async () => {
//     return await prisma.host.findMany({
//         select: {
//             id: true,
//             name: true,
//             description: true,
//             price: true,
//             cpu: true,
//             ram: true,
//             storage: true,
//         },
//         where: {
//             Order: null,
//         },
//     })
// }


export default BuyHost
