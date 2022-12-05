import { getSession} from "next-auth/react";
import {verifyRecovery} from "@/models/user";
import {useState} from "react";
import Input from "@/components/input/Input";
import {classNames} from "@/utils/utils";

export default function Reset({error, token}:{error?:string, token?:string}) {

    const [password, setPassword] = useState<string>('')
    const [passwordConfirm, setPasswordConfirm] = useState<string>('')
    const [error1, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    const verifyRecovery = async(e:any) => {
        e.preventDefault()
        if(password === '' || passwordConfirm === ''){
            setError('Заполните все поля')
            return
        }
        if(password !== passwordConfirm) {
            setError('Пароли не совпадают')
            return
        }
        setError('')
        const res = await fetch('/api/auth/reset', {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({password, token})
        })
        let data = await res.json()
        if(res.status != 200){
            setError(data.message);
        }
        if(res.status == 200){
            setError('')
            setSuccess(data.message)
        }
    }

    if(error){
        return (
            <div
                className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12">
                <div className="max-w-xl px-5 text-center">
                    <h2 className="mb-2 text-[42px] font-bold  text-white">Токен не действительный</h2>
                </div>
            </div>
        )
    }
    return(
        <div
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12">
            <div className="max-w-xl px-5 text-center">
                <h2 className="mb-2 text-[42px] font-bold  text-white">Восстановление аккаунта</h2>
                <div className={classNames(error1 ? "text-red-600" : "hidden")}>
                    {error1}
                </div>
                <div className={classNames(success ? "text-green-600" : "hidden")}>
                    {success}
                </div>
                <Input name={"Пароль"}
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       type={"password"}
                       id={"password"}
                       placeholder={"••••••••"}
                />
                <Input name={"Подтвердите пароль"}
                       value={passwordConfirm}
                       onChange={(e) => setPasswordConfirm(e.target.value)}
                       type={"password"}
                       id={"confirm-password"}
                       placeholder={"••••••••"}
                />
                <button
                        onClick={verifyRecovery}
                        className="focus:ring-4 mt-2 focus:ring-blue-300 font-medium rounded-lg md:text-xl text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">Восстановить
                </button>
            </div>
        </div>
    )
}

export async function getServerSideProps(context:any) {
    const { req } = context;
    const session = await getSession({ req });

    if (session) {
        return {
            redirect: { destination: "/" },
        };
    }

    const token = req.url.split('token=')[1];
    if(!token || typeof token !== "string"){
        return {
            props: { error: "Неверный токен" },
        }
    }
    const result = await verifyRecovery(token as string);
    if (result) {
        return{
            props:{
                token: token
            },
        }
    }else{
        return {
            props: { error: "Неверный токен" },
        }
    }
}

