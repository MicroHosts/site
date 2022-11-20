import Link from "next/link";

export default function CheckMail(){
    return(
        <div
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12">
            <div className="max-w-xl px-5 text-center">
                <h2 className="mb-2 text-[42px] font-bold  text-white">Провертье свою почту</h2>
                <p className="mb-2 text-lg text-zinc-500">Мы отправили на вашу почту письмо активации аккаунта</p>
                <Link href="login"
                   className="mt-3 inline-block w-96 rounded bg-indigo-600 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700">Войти</Link>
            </div>
        </div>
    )
}
