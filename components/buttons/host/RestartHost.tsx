import { successToast } from "@/utils/utils";

export default function RestartHost({id}: {id:string}) {

    const onClick = async() => {
        const res = await fetch(`/api/host/reboot?id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (res.status === 200) {
            successToast("Успешно перезапущено")
        }

    }

    return (
        <button type="button"
            onClick={onClick}
            className="focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-xl text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">Перезапустить
        </button>
    )
}