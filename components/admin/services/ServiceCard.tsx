import {useSetRecoilState} from "recoil";
import {editServiceOpen, serviceState} from "@/store/service";

export default function ServiceCard({service}: any) {
    const setService = useSetRecoilState(serviceState);
    const setEdit = useSetRecoilState(editServiceOpen);
    return (
        <tr className="border-b border-gray-700">
            <th scope="row"
                className="py-4 px-6 font-medium whitespace-nowrap text-white">
                {service.name}
            </th>
            <td className="py-4 px-6">
                {service.price} руб
            </td>
            <td className="py-4 pl-6">
                <button type="button"
                        onClick={() => {
                            setService(service)
                            setEdit(true)
                        }}
                        className="focus:ring-4 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-blue-800 text-base">Редактировать
                </button>
            </td>
        </tr>

    )
}
