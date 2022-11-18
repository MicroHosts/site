const BuyHostCard = () => {
    return(
        <div className="mt-4 bg-zinc-800 mx-auto rounded">
            <div className="py-4 px-6 flex justify-between text-sm flex flex-col md:flex-row">
                <div>
                    <div className="font-bold text-lg">
                        VDS
                    </div>
                    <div className="mt-2 text-base">
                        Подходит для небольших сайтов, серверов Minecraft, CS:GO и других игр.
                    </div>
                    <div className="font-bold mt-4 md:[&>*]:pr-4 md:[&>*]:pt-0 [&>*]:pt-2 text-sm md:flex-row flex flex-col flex-wrap">
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
                <div className="md:my-auto my-4 text-base">
                    390 руб / мес
                </div>
                <div className="my-auto">
                    <button type="button"
                            className="focus:ring-4 font-medium rounded-lg x-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800 text-base">Заказать
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BuyHostCard
