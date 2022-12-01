import { userState } from '@/store/user'
import { FaMemory } from 'react-icons/fa'
import { FiCpu } from 'react-icons/fi'
import { MdStorage } from 'react-icons/md'
import { useRecoilValue } from 'recoil'

const BuyHostCard = ({ host }: any) => {
    const user = useRecoilValue(userState)
    return (
        <div className="w-full max-w-sm p-4 border rounded-lg shadow-md sm:p-8 bg-gray-800 border-gray-700">
            <h5 className="mb-4 text-xl font-medium text-gray-400">{host.name}</h5>
            <div className="flex items-baseline text-white">
                <span className="text-4xl font-extrabold tracking-tight">{host.price} руб.</span>
                <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/в месяц</span>
            </div>
            <ul role="list" className="space-y-5 my-7">
                <li className="flex space-x-3">
                    <FiCpu className="flex-shrink-0 w-5 h-5 text-blue-500"/>
                    <span className="text-base font-normal leading-tight text-gray-400">{host.cpu}</span>
                </li>
                <li className="flex space-x-3">
                    <FaMemory className='flex-shrink-0 w-5 h-5 text-blue-500'/>
                    <span className="text-base font-normal leading-tight text-gray-400">{host.ram}</span>
                </li>
                <li className="flex space-x-3">
                    <MdStorage className="flex-shrink-0 w-5 h-5 text-blue-500"/>
                    <span className="text-base font-normal leading-tight text-gray-400">{host.storage}</span>
                </li>
            </ul>
            <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Купить</button>
        </div>
    )
    // return(
    //     <div className="mt-4 bg-zinc-800 mx-auto rounded">
    //         <div className="py-4 px-6 justify-between text-sm flex flex-col md:flex-row w-full">
    //             <div>
    //                 <div className="font-bold text-lg">
    //                     {host.name}
    //                 </div>
    //                 <div className="mt-2 text-base">
    //                     {host.description}
    //                 </div>
    //                 <div className="font-bold mt-4 md:[&>*]:pr-4 md:[&>*]:pt-0 [&>*]:pt-2 text-sm md:flex-row flex flex-col flex-wrap">
    //                     <div>
    //                         {host.cpu}
    //                     </div>
    //                     <div>
    //                         {host.ram}
    //                     </div>
    //                     <div>
    //                         {host.storage}
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="md:my-auto my-4 text-base mx-4">
    //                 {host.price} руб / мес
    //             </div>
    //             <div className="my-auto">
    //             <button type="button"
    //                 onClick={async () => {
    //                    await fetch("/api/callback/buy", {
    //                         method: "POST",
    //                         headers: {
    //                             "Content-Type": "application/json",
    //                         },
    //                         body: JSON.stringify({
    //                             hostId: host.id,
    //                             userId: user.id
    //                         }),
    //                     })
    //                 }}
    //                 className="focus:ring-4 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-blue-800 text-base">Заказать
    //             </button>
    //             </div>
    //         </div>
    //     </div>
    // )
}

export default BuyHostCard
