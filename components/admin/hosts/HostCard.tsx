import {toast} from "react-toastify";
import {useSetRecoilState} from "recoil";
import {editOpen, hostState} from "@/store/host";

export default function HostCard({host}:any) {
    console.log(host)
    const setHost = useSetRecoilState(hostState);
    const setEdit = useSetRecoilState(editOpen);
    const notify = () => toast.error('🦄 Wow so easy!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    return (
        <tr className="border-b dark:border-gray-700">
            <th scope="row"
                className="py-4 px-6 font-medium whitespace-nowrap text-white">
                {host.name}
            </th>
            <td className="py-4 px-6">
                {host.price} руб
            </td>
            <td className="py-4 px-6">
                Куплено до 01.01.2021
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
        </tr>

    )
}
