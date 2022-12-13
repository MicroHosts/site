import Image from "next/image";
import {classNames} from "@/utils/utils";
import Link from "next/link";
import {useState} from "react";

export default function HeaderMain(){
    const[open, setOpen] = useState(false);
    return(
        <nav className="px-2 sm:px-4 py-2.5">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="https://microhost1.ru/" className="flex items-center">
                    <Image className="w-12 h-12 mr-2"
                           src="/logo.svg" alt="logo" width={400} height={400}/>
                    <span
                        className="self-center text-2xl font-semibold whitespace-nowrap text-white">MicroHost</span>
                </a>
                <button data-collapse-toggle="navbar-default" type="button"
                        className="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
                        aria-controls="navbar-default" aria-expanded="false"
                        onClick={() => setOpen(!open)}>
                    <span className="sr-only">Открыть</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clipRule="evenodd"></path>
                    </svg>
                </button>
                <div className={classNames(open ? "" : "hidden", "w-full md:block md:w-auto")}>
                    <ul className="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <li>
                            <Link href="#"
                               className="block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 md:text-lg"
                            >Главная</Link>
                        </li>
                        <li>
                            <a href="#"
                               className="block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 md:text-lg">
                                О нас</a>
                        </li>
                        <li>
                            <a href="#"
                               className="block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 md:text-lg">
                                Тарифы</a>
                        </li>
                        <li>
                            <a href="#"
                               className="block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 md:text-lg">
                                Мониторинг</a>
                        </li>
                    </ul>
                </div>
                <div className={classNames(open ? "" : "hidden", "w-full md:block md:w-auto")}>
                    <Link href={"/billing"}
                          className="md:ml-0 ml-4 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-lg px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">Биллинг
                    </Link>
                </div>
            </div>
        </nav>
    )
}
