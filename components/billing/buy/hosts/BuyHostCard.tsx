import { userState } from '@/store/user'
import {useRecoilValue} from 'recoil'

const BuyHostCard = ({host}:any) => {
    const user = useRecoilValue(userState)
    return(
        <div className="mt-4 bg-zinc-800 mx-auto rounded">
            <div className="py-4 px-6 justify-between text-sm flex flex-col md:flex-row">
                <div>
                    <div className="font-bold text-lg">
                        {host.name}
                    </div>
                    <div className="mt-2 text-base">
                        {host.description}
                    </div>
                    <div className="font-bold mt-4 md:[&>*]:pr-4 md:[&>*]:pt-0 [&>*]:pt-2 text-sm md:flex-row flex flex-col flex-wrap">
                        <div>
                            {host.cpu}
                        </div>
                        <div>
                            {host.ram}
                        </div>
                        <div>
                            {host.storage}
                        </div>
                    </div>
                </div>
                <div className="md:my-auto my-4 text-base">
                    {host.price} руб / мес
                </div>
                <div className="my-auto">
                <button type="button"
                    onClick={() => {
                        fetch("/api/callback/buy", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                hostId: host.id,
                                userId: user.id
                            }),
                        })
                    }}
                    className="focus:ring-4 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-blue-800 text-base">Заказать
                </button>
                </div>
            </div>
        </div>
    )
}

export default BuyHostCard
