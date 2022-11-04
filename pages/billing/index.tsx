import styles from "../../styles/Home.module.css";
import Head from "next/head";
import {classNames} from "../../utils/utils";
import Link from "next/link";

export default function Billing() {
    return(
        <div className={styles.container}>
            <Head>
                <title>Биллинг</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div>
                <nav className="px-2 sm:px-4 py-2.5">
                    <div className="container flex flex-wrap justify-between items-center mx-auto">
                        <a href="https://flowbite.com/" className="flex items-center">
                            <img src="" className="mr-3 h-6 sm:h-9"
                                 alt="Logo"/>
                            <span
                                className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MicroHost</span>
                        </a>
                        {/*<button data-collapse-toggle="navbar-default" type="button"*/}
                        {/*        className="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"*/}
                        {/*        aria-controls="navbar-default" aria-expanded="false"*/}
                        {/*        onClick={() => setOpen(!open)}>*/}
                        {/*    <span className="sr-only">Открыть</span>*/}
                        {/*    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"*/}
                        {/*         xmlns="http://www.w3.org/2000/svg">*/}
                        {/*        <path fillRule="evenodd"*/}
                        {/*              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"*/}
                        {/*              clipRule="evenodd"></path>*/}
                        {/*    </svg>*/}
                        {/*</button>*/}
                        {/*<div className={classNames(open ? "" : "hidden", "w-full md:block md:w-auto")}>*/}
                        {/*    <ul className="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">*/}
                        {/*        <li>*/}
                        {/*            <a href="#"*/}
                        {/*               className="block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 md:text-lg"*/}
                        {/*            >Главная</a>*/}
                        {/*        </li>*/}
                        {/*        <li>*/}
                        {/*            <a href="#"*/}
                        {/*               className="block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 md:text-lg">*/}
                        {/*                О нас</a>*/}
                        {/*        </li>*/}
                        {/*        <li>*/}
                        {/*            <a href="#"*/}
                        {/*               className="block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 md:text-lg">*/}
                        {/*                Тарифы</a>*/}
                        {/*        </li>*/}
                        {/*        <li>*/}
                        {/*            <a href="#"*/}
                        {/*               className="block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 md:text-lg">*/}
                        {/*                Мониторинг</a>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}
                        {/*</div>*/}
                        <div className={classNames( "w-full md:block md:w-auto")}>
                            <Link href={"/billing"}
                                  className="md:ml-0 ml-4 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-lg px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800">Выйти
                            </Link>
                        </div>
                    </div>
                </nav>
                <div className="container flex h-screen">
                    <div className="w-64">
                            <div className="overflow-y-auto py-4 px-3">
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#"
                                           className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <svg aria-hidden="true"
                                                 className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                                 fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                            </svg>
                                            <span className="ml-3">Мои заказы</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <svg aria-hidden="true"
                                                 className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                                 fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                            </svg>
                                            <span className="flex-1 ml-3 whitespace-nowrap">Заказать услуги</span>
                                            {/*<span*/}
                                            {/*    className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>*/}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <svg aria-hidden="true"
                                                 className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                                 fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                                                <path
                                                    d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                                            </svg>
                                            <span className="flex-1 ml-3 whitespace-nowrap">Баланс</span>
                                            <span
                                                className="inline-flex justify-center items-center p-3 ml-3 w-10 h-10 text-sm font-medium rounded-full ">100р</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <svg aria-hidden="true"
                                                 className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                                 fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                      clip-rule="evenodd"></path>
                                            </svg>
                                            <span className="flex-1 ml-3 whitespace-nowrap">О вас</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <svg aria-hidden="true"
                                                 className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                                 fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                      clip-rule="evenodd"></path>
                                            </svg>
                                            <span className="flex-1 ml-3 whitespace-nowrap">Википедия</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                    </div>
                    <div>
                       <div>
                           Мои заказы
                       </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
