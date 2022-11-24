const BuyHostCardError = () => {
    return(
        <div className="mt-4 bg-zinc-800 mx-auto rounded">
            <div className="py-4 px-6 justify-between text-sm flex flex-col md:flex-row">
                <div>
                    <div className="font-bold text-lg">
                        Ошибка
                    </div>
                    <div className="mt-2 text-base">
                    Ошибка
                    </div>
                    <div className="font-bold mt-4 md:[&>*]:pr-4 md:[&>*]:pt-0 [&>*]:pt-2 text-sm md:flex-row flex flex-col flex-wrap">
                        {/* <div>
                            2 x XEON E5-2667v2
                        </div>
                        <div>
                            4 Гб ОЗУ DDR3
                        </div>
                        <div>
                            100 Гб SSD
                        </div> */}
                    </div>
                </div>
                <div className="md:my-auto my-4 text-base">
                    Ошибка
                </div>
                <div className="my-auto">
                </div>
            </div>
        </div>
    )
}

export default BuyHostCardError
