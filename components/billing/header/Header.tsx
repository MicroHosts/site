import {RiBillFill} from "react-icons/ri";
import {AiFillInfoCircle, AiFillTag} from "react-icons/ai";
import {FaUserAlt, FaWallet} from "react-icons/fa";
import Link from "next/link";
import {useSession} from "next-auth/react";

const Header = () => {
    const {data: session} = useSession();
    console.log(session)
    return(
        <div className="md:w-64 w-full">
            <div className="overflow-y-auto py-4 px-3">
                <ul className="space-y-2">
                    <hr className="border-gray-200 sm:mx-auto dark:border-gray-700 "/>
                    <li>
                        <Link href="/billing"
                           className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <RiBillFill className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                            <span className="ml-3">Мои заказы</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/billing/buy"
                           className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <AiFillTag className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                            <span className="flex-1 ml-3 whitespace-nowrap">Заказать</span>
                            {/*<span*/}
                            {/*    className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>*/}
                        </Link>
                    </li>
                    <li>
                        <Link href="/billing/profile"
                           className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <FaUserAlt className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                            <span className="flex-1 ml-3 whitespace-nowrap">Профиль</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://wiki.microhost1.ru"
                           className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <AiFillInfoCircle className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                            <span className="flex-1 ml-3 whitespace-nowrap">Википедия</span>
                        </Link>
                    </li>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
                    <li>
                        <div
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                            <FaWallet className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                            <span className="flex-1 ml-3 whitespace-nowrap">Баланс</span>
                            <span
                                className="inline-flex justify-center items-center p-3 ml-3 w-10 h-10 text-sm font-medium rounded-full ">100р</span>
                        </div>
                    </li>
                    <li className="flex justify-center">
                        <Link href={"/billing"}
                              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Пополнить
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header;
