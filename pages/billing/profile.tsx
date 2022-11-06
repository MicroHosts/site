import styles from "../../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";
import {classNames} from "../../utils/utils";
import Header from "../../components/billing/header/Header";
import {Tab} from "@headlessui/react";
import {Fragment} from "react";
import BuyHostCard from "../../components/billing/buy/hosts/BuyHostCard";
import BuyServiceCard from "../../components/billing/buy/services/BuyServiceCard";
import NoPayList from "../../components/billing/nopay/NoPayList";
import MainProfile from "../../components/billing/profile/main/MainProfile";
import SecureProfile from "../../components/billing/profile/main/SecureProfile";

export default function Profile(){
    return(
        <div className={styles.container}>
            <Head>
                <title>Биллинг</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div>
                <nav className="px-2 sm:px-4 py-2.5">
                    <div className="container flex flex-wrap justify-between items-center mx-auto">
                        <Link href="/" className="flex items-center">
                            <img src="" className="mr-3 h-6 sm:h-9"
                                 alt="Logo"/>
                            <span
                                className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MicroHost</span>
                        </Link>
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
                <div className="container md:flex h-screen">
                    <Header/>
                    <div className="w-full mx-auto ml-4">
                        <div>
                            Профиль
                        </div>
                        <div>
                            <Tab.Group>
                                <Tab.List className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 justify-center">
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={classNames(
                                                    selected
                                                        ? 'inline-block p-4 rounded-t-lg text-indigo-600 dark:border-indigo-600 dark:text-indigo-400'
                                                        : 'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300')
                                                }
                                            >Мои данные</button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={classNames(
                                                    selected
                                                        ? 'inline-block p-4 rounded-t-lg text-indigo-600 dark:border-indigo-600 dark:text-indigo-400'
                                                        : 'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300')
                                                }
                                            >Безопасность и доступ</button>
                                        )}</Tab>
                                </Tab.List>
                                <Tab.Panels>
                                    <Tab.Panel>
                                        <MainProfile/>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <SecureProfile/>
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
