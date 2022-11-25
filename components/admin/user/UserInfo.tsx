export default function UserInfo({ user }: any) {
    return (
        <div className="flex flex-col text-lg md:w-1/2 md:mx-auto">
            <div className="flex md:flex-row flex-col justify-between">
                <div>
                    Имя пользователя: {user.name ? user.name : "Не указано"}
                </div>
                <div>
                    Почта: {user.email}
                </div>
            </div>
            <div className="flex flex-col md:justify-between md:flex-row ">
                <div>
                    Фамилия: {user.info.first_name ? user.info.first_name : "Не указано"}
                </div>
                <div>
                    Имя: {user.info.last_name ? user.info.last_name : "Не указано"}
                </div>
            </div>
            <div className="flex flex-col md:justify-between md:flex-row ">
                <div>
                    Отчество: {user.info.second_name ? user.info.second_name : "Не указан"}
                </div>
                <div>
                    Номер телефона: {user.info.phone_number ? user.info.phone_number : "Не указан"}
                </div>
            </div>

            <div className="flex flex-col md:justify-between md:flex-row ">
                <div>
                    Статус: {user.info.blocked ? "Заблокирован" : (user.emailVerified ? "Подтвержден" : "Не подтвержден")}
                </div>
                <div>
                    {user.blocked ? (
                        <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Разбанить</button>
                    ) : (

                        <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Забанить</button>
                    )}

                </div>
            </div>
        </div>
    )
}