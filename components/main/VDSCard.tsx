import Link from "next/link";

const VDSCard = () => {
    return(
        <div className="mt-4 bg-zinc-800 mx-auto rounded">
            <div className="py-4 md:px-24 px-6 flex justify-between md:text-xl text-sm">
                <div>
                    <div className="font-bold">
                        VDS
                    </div>
                    <div>
                        Подходит для небольших сайтов, серверов Minecraft, CS:GO и других игр.
                    </div>
                    <div className="font-bold mt-4 flex flex-row flex-wrap [&>*]:pr-4 md:text-xl text-sm">
                        <div>
                            2 x XEON E5-2667v2
                        </div>
                        <div>
                            4 Гб ОЗУ DDR3
                        </div>
                        <div>
                            100 Гб SSD
                        </div>
                    </div>
                </div>
                <div className="my-auto">
                    <Link type="button"
                            href="/billing/buy"
                            className="focus:ring-4 font-medium rounded-lg md:text-xl text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800">Заказать
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default VDSCard;
