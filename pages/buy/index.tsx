import Input from "@/components/input/Input"
import {errorToast} from "@/utils/utils";
import Image from "next/image"
import Router from "next/router";
import { useState } from "react"
import { mutate } from "swr";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";

function Index() {
    const [buyPrice, setBuyPrice] = useState(0);
    const [email, setEmail] = useState("");
    const onBuy = async(price:number) => {
        if(buyPrice <= 0 && buyPrice <= 100000){
            errorToast("Пополнения от суммы больше нуля и меньше 100000");
            return
        }
        const res = await fetch("/api/buy", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ price, email })
        });
        const data = await res.json();
        if (res.status !== 200) {
            errorToast(data.message);
        }else if (res.status === 200) {
            await Router.push(data.url);
            await mutate("/api/user");
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Пополнение баланса</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div>
                <nav className="md:px-2 py-2.5">
                    <div className="flex flex-wrap justify-between items-center mx-auto mt-4 md:mt-0">
                        <Link href="/" className="flex items-center">
                            <Image className="w-12 h-12 mr-2"
                                   src="/logo.svg" alt="logo" height={400} width={400}/>
                            <span
                                className="self-center text-2xl font-semibold whitespace-nowrap text-white">MicroHost</span>
                        </Link>
                    </div>
                </nav>
                <div className="md:flex">
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
                            <Input type="email" name="Email" placeholder="Введите почту" value={email} onChange={(e) => {
                                setEmail(e.target.value);
                            }} id="email" />
                            <div className="pb-4"/>
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
                </div>
            </div>
        </div>
    )
}


export default Index
