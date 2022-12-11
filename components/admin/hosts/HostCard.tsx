import {useSetRecoilState} from "recoil";
import {editHostOpen, hostState} from "@/store/host";
import Link from "next/link";

export default function HostCard({host}:any) {
    const setHost = useSetRecoilState(hostState);
    const setEdit = useSetRecoilState(editHostOpen);
    return (
        <tr className="border-b border-gray-700">
            <th scope="row"
                className="py-4 px-6 font-medium whitespace-nowrap text-white">
                {host.name}
            </th>
            <td className="py-4 px-6">
                {host.price} руб
            </td>
            <td className="py-4 pl-6">
                <button type="button"
                        onClick={() => {
                            setHost(host)
                            setEdit(true)
                        }}
                    className="focus:ring-4 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-blue-800 text-base">Редактировать
                </button>
            </td>
            <td className="py-4 pl-6">
                <Link
                    href={`/host/${host.id}`}
                    type="button"
                        className="focus:ring-4 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-blue-800 text-base">Войти
                </Link>
            </td>
        </tr>

    )
}
