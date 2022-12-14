import Router from "next/router"

export default function UserCard({user}:any) {
    return (
        <tr className="border-b border-gray-700">
            <th scope="row"
                className="py-4 px-6 font-medium whitespace-nowrap text-white">
                    {user.name}
            </th>
            <td className="py-4 px-6">
                {user.email}
            </td>
            <td className="py-4 px-6">
                {user.blocked ? "Заблокирован" : (user.emailVerified ? "Подтвержден" : "Не подтвержден")}
            </td>
            <td className="py-4 pl-6">
                <button type="button"
                onClick={() => {
                    Router.push(`/admin/users/${user.id}`)
                }}
                    className="focus:ring-4 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-blue-800 text-base">Редактировать
                </button>
            </td>
        </tr>

    )
}
