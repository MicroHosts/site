import Link from "next/link";
import {RiBillFill} from "react-icons/ri";
import {AiFillTag} from "react-icons/ai";
import {FaUserAlt} from "react-icons/fa";

export default function AdminHeader(){
    // @ts-ignore
    return(
        <div className="md:w-64 w-full">
            <div className="overflow-y-auto py-4 px-3">
                <ul className="space-y-2">
                    <hr className="sm:mx-auto border-gray-700 "/>
                    <li>
                        <Link href="/admin"
                              className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700">
                            <RiBillFill className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white"/>
                            <span className="ml-3">Информация</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/services"
                              className="flex items-center p-2 text-base font-normal rounded-lg text-white  hover:bg-gray-700">
                            <AiFillTag className="flex-shrink-0 w-6 h-6 ransition duration-75 text-gray-400  group-hover:text-white"/>
                            <span className="flex-1 ml-3 whitespace-nowrap">Услуги</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/users"
                              className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700">
                            <FaUserAlt className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white"/>
                            <span className="flex-1 ml-3 whitespace-nowrap">Пользователи</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
