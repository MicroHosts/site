export default function FooterMain(){
    return(
        <footer className="p-4 sm:p-6 mt-24">
            <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                    <div className="flex flex-col">
                        <a href="https://flowbite.com/" className="flex items-center">
                            <img src="" className="mr-3 h-8"
                                 alt="Microhost Logo"/>
                            <span
                                className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MicroHost</span>
                        </a>
                        <span className="text-sm text-gray-500 dark:text-gray-400 mt-4">© 2022 MicroHost
                          </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 mt-4">Кого-то ИП
                          </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 mt-4">Почта для обращений:
                          </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">support@microhost.ru
                          </span>
                    </div>
                </div>
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Услуги</h2>
                    <ul className="text-gray-600 dark:text-gray-400">
                        <li className="mb-4">
                            <a href="https://flowbite.com/" className="hover:underline">VDS Low</a>
                        </li>
                        <li className="mb-4">
                            <a href="https://tailwindcss.com/" className="hover:underline">VDS High</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Полезные
                        ссылки</h2>
                    <ul className="text-gray-600 dark:text-gray-400">
                        <li className="mb-4">
                            <a href="https://github.com/themesberg/flowbite"
                               className="hover:underline ">Условия пользования</a>
                        </li>
                        <li className="mb-4">
                            <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Политика
                                конфиденциальности</a>
                        </li>
                        <li className="mb-4">
                            <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Группа
                                ВКонтакте</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}