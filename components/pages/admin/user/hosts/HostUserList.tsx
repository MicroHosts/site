export default function HostUserList({hosts}:any) {
    return (
        <div className="overflow-x-auto relative w-full">
            <table
                className="w-full text-sm text-left text-gray-400">
                <thead
                    className="text-xs uppercase text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Хост
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Цена в месяц
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Статус
                        </th>
                        <th scope="col" className="py-3 px-6">
                            VIMID
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Забрать
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {hosts && hosts.map((host: any, index: number) => (
                        <HostCard host={host} key={index} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}


function HostCard({host}:any) {
    const date = new Date(host.rentDate)
    const dateformat = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
    return (
        <tr className="border-b border-gray-700">
            <th scope="row"
                className="py-4 px-6 font-medium whitespace-nowrap text-white">
                    {host.host.name}
            </th>
            <td className="py-4 px-6">
                {host.host.price}
            </td>
            <td className="py-4 px-6">
                {dateformat}
            </td>
            <td className="py-4 px-6">
                {host.host.vimid}
            </td>
            <td className="py-4 pl-6">
                <button type="button"
                        onClick={async() => {
                            const res = await fetch(`/api/admin/user/host/${host.id}/take`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            })
                            console.log(res.status)
                        }}
                    className="focus:ring-4 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-red-800 text-base">Забрать
                </button>
            </td>
        </tr>
    )
}
