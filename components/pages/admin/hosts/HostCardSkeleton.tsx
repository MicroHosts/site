export default function HostCardSkeleton() {
    return (
        <tr className="border-b border-gray-700 animate-pulse">
            <th scope="row"
                className="py-4 px-6 font-medium whitespace-nowrap text-white">
                    <div className="h-2 bg-gray-700 rounded-full">
                </div>
            </th>
            <td className="py-4 px-6">
                <div className="h-2 bg-gray-700 rounded-full">
                </div>
            </td>
            <td className="py-4 px-6">
                <div className="h-2 bg-gray-700 rounded-full">
                </div>
            </td>
            <td className="py-4 pl-6">
            </td>
        </tr>

    )
}
