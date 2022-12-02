import Input from "@/components/input/Input"
import BillingLayout from "@/layouts/Billing"
import { errorToast, successToast } from "@/utils/utils";
import Image from "next/image"
import { ReactElement, useState } from "react"
import { mutate } from "swr";

function Balance() {
    const [buyPrice, setBuyPrice] = useState(0);
    const onBuy = async(price:number) => {
        //TODO add buy method for freekassa and e.t.c
        const res = await fetch("/api/buy/balance", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ price })
        });
        const data = await res.json();
        if (res.status !== 200) {
            errorToast(data.message);
        }else if (res.status === 200) {
            successToast("Вы успешно пополнили баланс!");
            await mutate("/api/user");
        }
    }

    return (
        <div className="mx-auto">
            <div className="mx-auto">
                <div className="space-y-8 lg:grid lg:grid-cols-4 sm:gap-6 xl:gap-10 lg:space-y-0">
                    <div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-gray-800 text-white">
                        <h3 className="mb-4 text-2xl font-semibold">Начальный</h3>
                        <Image src="/pifin.svg" width={100} height={100} alt="" className="mx-auto" />
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">500р</span>
                        </div>
                        <button onClick={() => {
                            onBuy(500)
                        }} className="mt-4 md:ml-0 ml-4 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-lg px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">Купить</button>
                    </div>
                    <div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-gray-800 text-white">
                        <h3 className="mb-4 text-2xl font-semibold">Стандартный</h3>
                        <Image src="/okhand.svg" width={100} height={100} alt="" className="mx-auto" />
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">1500р</span>
                        </div>
                        <button onClick={() => {
                            onBuy(1500)
                        }} className="mt-4 md:ml-0 ml-4 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-lg px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">Купить</button>
                    </div>
                    <div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-gray-800 text-white">
                        <h3 className="mb-4 text-2xl font-semibold">Бизнес</h3>
                        <Image src="/loveg.svg" width={100} height={100} alt="" className="mx-auto" />
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">5000р</span>
                        </div>
                        <button onClick={() => {
                            onBuy(5000)
                        }} className="mt-4 md:ml-0 ml-4 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-lg px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">Купить</button>
                    </div>
                    <div className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-gray-800 text-white">
                        <h3 className="mb-4 text-2xl font-semibold">Огонь</h3>
                        <Image src="/fire.svg" width={100} height={100} alt="" className="mx-auto" />
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">10000р</span>
                        </div>
                        <button onClick={() => {
                            onBuy(10000)
                        }} className="mt-4 md:ml-0 ml-4 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-lg px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">Купить</button>
                    </div>
                </div>
            </div>
            <div className="mt-24 flex flex-col">
                <Input type="text" name="Своя сумма" placeholder="Введите сумму" value={buyPrice} onChange={(e) => { 
                    const value:number = parseInt(e.target.value);
                    if(isNaN(value)) {
                        setBuyPrice(0);
                    }
                    if(Number.isInteger(value)) {
                        setBuyPrice(value);
                    }
                }} id="number" />
                <button onClick={() => onBuy(buyPrice)}
                    className="mt-4 md:ml-0 ml-4 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-lg px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">Купить
                </button>
            </div>
        </div>

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