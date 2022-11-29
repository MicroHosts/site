import Image from "next/image";
import Link from "next/link";

export default function FooterMain() {
    return (
        <footer className="p-4 sm:p-6 mt-24">
            <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                    <div className="flex flex-col">
                        <Link href="/" className="flex items-center">
                            <Image className=""
                                src="/logo.svg" alt="logo" width={35} height={35} />
                            <span
                                className="self-center text-2xl font-semibold whitespace-nowrap text-white">MicroHost</span>
                        </Link>
                        <span className="text-smtext-gray-400 mt-4">© 2022 MicroHost
                        </span>
                        <span className="text-smtext-gray-400 mt-4">Кого-то ИП
                        </span>
                        <span className="text-smtext-gray-400 mt-4">Почта для обращений:
                        </span>
                        <span className="text-smtext-gray-400">support@microhost.ru
                        </span>
                    </div>
                </div>
                <div>
                    <h2 className="mb-6 text-sm font-semibold uppercase text-white">Услуги</h2>
                    <ul className="text-gray-400">
                        <li className="mb-4">
                            <Link href="/" className="hover:underline">VDS Low</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="/" className="hover:underline">VDS High</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="mb-6 text-sm font-semibold uppercase text-white">Полезные
                        ссылки</h2>
                    <ul className="text-gray-400">
                        <li className="mb-4">
                            <Link href="/"
                                className="hover:underline">Условия пользования</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="/" className="hover:underline">Политика
                                конфиденциальности</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="" className="hover:underline">Группа
                                ВКонтакте</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}