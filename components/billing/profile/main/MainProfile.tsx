import { LegacyRef, MouseEvent, useRef, useState, } from "react";
import useUserInfo from "@/hooks/useUserInfo";
import {useRecoilValue} from "recoil";
import { userState } from "@/store/user";
import { successToast } from "@/utils/utils";

const MainProfile = () => {
    const user = useRecoilValue(userState);
    const {info, isLoading, isError} = useUserInfo(user.id);
    const first_name: LegacyRef<HTMLInputElement>  = useRef(null);
    const last_name: LegacyRef<HTMLInputElement>  = useRef(null);
    const second_name: LegacyRef<HTMLInputElement>  = useRef(null);
    const phone: LegacyRef<HTMLInputElement>  = useRef(null);
    
    if(isError){
        return <div>Ошибка</div>
    }
    if(isLoading){
        return <div>Загрузка...</div>
    }

    const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(!first_name.current || !last_name.current || !second_name.current || !phone.current){
            return
        }
        const data = {
            first_name: first_name.current.value,
            last_name: last_name.current.value,
            second_name: second_name.current.value,
            phone_number: phone.current.value,
        }
        const res = await fetch(`/api/user/info?id=${info.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        successToast("Данные успешно обновлены");
    }

    return(
        <form className="mt-4">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="first_name"
                           className="block mb-2 text-sm font-medium text-gray-300">Фамилия</label>
                    <input type="text" id="first_name"
                           className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                           placeholder="Иванов"
                           ref={first_name}
                           defaultValue={info.first_name}
                           />
                </div>
                <div>
                    <label htmlFor="last_name"
                           className="block mb-2 text-sm font-medium text-gray-300">Имя</label>
                    <input type="text" id="last_name"
                           className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                           placeholder="Иван"
                           ref={last_name}
                           defaultValue={info.last_name}
                           />
                </div>
                <div>
                    <label htmlFor="last_name"
                           className="block mb-2 text-sm font-medium text-gray-300">Отчество</label>
                    <input type="text" id="last_name"
                           className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                           placeholder="Иванович"
                           ref={second_name}
                           defaultValue={info.second_name}
                           />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-300">Контактый телефон</label>
                    <input type="tel" id="phone"
                           className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                           placeholder="+7 495 1111111" pattern="^\+[0-9]{1,3} [0-9]{1,6} [0-9]{3,10}$"
                           ref={phone}
                           defaultValue={info.phone_number}
                           />
                </div>
            </div>
            <button type="submit"
                    onClick={onSubmit}
                    className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Сохранить
            </button>
        </form>
    )
}

export default MainProfile
