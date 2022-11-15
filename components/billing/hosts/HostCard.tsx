const HostCard = ({host}:{host:HostUser}) => {
    return(
        <tr className="border-b dark:border-gray-700">
            <th scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {host.name}
            </th>
            <td className="py-4 px-6">
                {host.price} руб
            </td>
            <td className="py-4 px-6">
                31.12.12
            </td>
            <td className="py-4 px-6">
                Войти
            </td>
        </tr>
    )
}



export default HostCard
