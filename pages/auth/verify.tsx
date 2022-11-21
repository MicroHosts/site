import {verifyUser} from "@/models/user";
import Link from "next/link";

export default function Verify({error}:{error?:string}) {
    if(error){
        return (
            <div
                className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12">
                <div className="max-w-xl px-5 text-center">
                    <h2 className="mb-2 text-[42px] font-bold  text-white">Токен не действительный</h2>
                    <p className="mb-2 text-lg text-zinc-500">Провертье свою почту</p>
                </div>
            </div>
        )
    }
    return(
        <div
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12">
            <div className="max-w-xl px-5 text-center">
                <h2 className="mb-2 text-[42px] font-bold  text-white">Аккаунт успешно привязан</h2>
                <Link href="login"
                      className="mt-3 inline-block w-96 rounded bg-indigo-600 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700">Войти</Link>
            </div>
        </div>
    )
}

export async function getServerSideProps(context:any){
    const { req } = context;
    const token = req.url.split('token=')[1];
    if(!token || typeof token !== "string"){
        return {
            props: { error: "Неверный токен" },
        }
    }
    const result = await verifyUser(token as string);
    if (result) {
        return{
            props:{

            },
        }
    }else{
        return {
            props: { error: "Неверный токен" },
        }
    }
}
