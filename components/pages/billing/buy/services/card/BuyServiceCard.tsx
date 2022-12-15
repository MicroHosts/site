import Link from "next/link";

const BuyServiceCard = ({service}: any) => {
    return(
        <div className="mt-4 bg-zinc-800 mx-auto rounded">
            <div className="py-4 px-6 justify-between text-sm flex flex-col md:flex-row w-full">
                <div>
                    <div className="font-bold text-lg">
                        {service.name}
                    </div>
                    <div className="mt-2 text-base w-full">
                        {service.description}
                    </div>
                </div>
                <div className="md:my-auto my-4 text-base mx-4">
                    {service.price} руб / мес
                </div>
                <div className="my-auto">
                    <Link href={`/billing/buy/service/${service.id}`}
                            className="focus:ring-4 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800 text-base">Купить
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BuyServiceCard
