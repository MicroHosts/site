import { useState } from "react";
import { errorToast, successToast } from "@/utils/utils";

const SecureProfile = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const onSubmit = async (e: any) => {
        e.preventDefault()
        const data = {
            password: password,
            newPassword: newPassword
        }
        const res = await fetch(`/api/user/password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (res.status === 200) {
            successToast("Пароль успешно обновлен");
        }
        if (res.status !== 200) {
            errorToast("Ошибка при обновлении пароля");
        }
    }

    return (
        <form className="mt-4">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-300">Старый пароль</label>
                    <input type="password" id="first_name"
                        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-300">Новый пароль</label>
                    <input type="password" id="first_name"
                        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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

export default SecureProfile
