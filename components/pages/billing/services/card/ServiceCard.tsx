import Link from "next/link"

const ServiceCard = ({service}:any) => {
    const date = new Date(service.rentDate)
    const dateformat = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
    return(
        <tr className="border-b border-gray-700">
            <th scope="row"
                className="py-4 px-6 font-medium whitespace-nowrap text-white">
                {service.service.name}
            </th>
            <td className="py-4 px-6">
                {service.service.price} руб
            </td>
            <td className="py-4 px-6">
                {dateformat}
            </td>
            <td className="py-4 px-6">
                <Link type="button"
                      href={`/billing/extend/service/${service.id}`}
                      className="focus:ring-4 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800 text-base text-white">Продлить
                </Link>
            </td>
        </tr>
    )
}



export default ServiceCard
