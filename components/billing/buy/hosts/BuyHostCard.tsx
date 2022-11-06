const BuyHostCard = () => {
    return(
        <div className="mt-4 bg-zinc-800 mx-auto rounded">
            <div className="py-4 px-6 flex justify-between text-sm">
                <div>
                    <div className="font-bold">
                        VDS
                    </div>
                    <div>
                        Подходит для небольших сайтов, серверов Minecraft, CS:GO и других игр.
                    </div>
                    <div className="font-bold mt-4 flex flex-row flex-wrap [&>*]:pr-4 text-sm">
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
                    390 руб / мес
                </div>
                <div className="my-auto">
                    <button type="button"
                            className="focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800">Заказать
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BuyHostCard
