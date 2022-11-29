import BillingLayout from "@/layouts/Billing"
import Image from "next/image"
import { ReactElement } from "react"

function Balance() {
    return (
        <>
            <div className="mx-auto">
                <div className="space-y-8 lg:grid lg:grid-cols-4 sm:gap-6 xl:gap-10 lg:space-y-0">
                    <div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-gray-800 text-white">
                        <h3 className="mb-4 text-2xl font-semibold">Начальный</h3>
                        <Image src="/pifin.svg" width={100} height={100} alt="" className="mx-auto" />
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">500р</span>
                        </div>
                        <a href="#" className="bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white focus:ring-primary-900">Купить</a>
                    </div>
                    <div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-gray-800 text-white">
                        <h3 className="mb-4 text-2xl font-semibold">Стандартный</h3>
                        <Image src="/okhand.svg" width={100} height={100} alt="" className="mx-auto" />
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">1500р</span>
                        </div>
                        <a href="#" className="bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white focus:ring-primary-900">Купить</a>
                    </div>
                    <div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-gray-800 text-white">
                        <h3 className="mb-4 text-2xl font-semibold">Бизнес</h3>
                        <Image src="/loveg.svg" width={100} height={100} alt="" className="mx-auto" />
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">5000р</span>
                        </div>
                        <a href="#" className="bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white focus:ring-primary-900">Купить</a>
                    </div>
                    <div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-gray-800 text-white">
                        <h3 className="mb-4 text-2xl font-semibold">Огонь</h3>
                        <Image src="/fire.svg" width={100} height={100} alt="" className="mx-auto" />
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">10000р</span>
                        </div>
                        <a href="#" className="bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white focus:ring-primary-900">Купить</a>
                    </div>
                </div>
            </div>
            Своя сумма
            {/* <Input/> */}
        </>

    )
}

Balance.getLayout = function getLayout(page: ReactElement) {
    return (
        <BillingLayout>
            {page}
        </BillingLayout>
    )
}

export default Balance