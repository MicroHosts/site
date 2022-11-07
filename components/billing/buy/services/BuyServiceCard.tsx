const BuyServiceCard = () => {
    return(
        <div className="mt-4 bg-zinc-800 mx-auto rounded">
            <div className="py-4 px-6 flex justify-between text-sm flex flex-col md:flex-row">
                <div>
                    <div className="font-bold text-lg">
                        Администирование сервера Minecraft
                    </div>
                    <div className="mt-2 text-base">
                       Мы настроим ваш сервер Minecraft, установим плагины, моды, настроим бекапы и многое другое.
                    </div>
                </div>
                <div className="md:my-auto my-4 text-base">
                    390 руб / мес
                </div>
                <div className="my-auto">
                    <button type="button"
                            className="focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800 text-base">Купить
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BuyServiceCard
