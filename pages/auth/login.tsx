// @ts-ignore
import Link from "next/link";
import { signIn, getSession, getCsrfToken } from "next-auth/react";
import {MouseEvent, ReactElement, useState} from "react";
import {classNames, validateEmail} from "@/utils/utils";
import Router from 'next/router'
import AuthLayout from "@/auth/layout";
import Register from "./register";
import Input from "@/components/input/Input";

const Login = ({csrfToken}:any) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string>('')

    const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(!validateEmail(email)){
            setError('Некорректный email')
            return;
        }
        if(password.trim().length === 0){
            setError('Пароль не может быть пустым')
            return;
        }
       const data = await signIn("credentials", {email: email, password: password, redirect: false})
        if(!data){
            setError('Неудалось подключится к серверу')
            return;
        }
        if(data.error){
            setError(data.error)
            return
        }
        return Router.push("/billing")
    }

    return(
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                            Вход в аккаунт
                        </h1>
                        <div className={classNames(error ? "text-red-600" : "hidden")}>
                            {error}
                        </div>
                        <div className="space-y-4 md:space-y-6">
                            <Input name={"Ваша почта"}
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   type={"email"}
                                   id={"email"}
                                   placeholder={"name@gmail.com"}
                                   />
                            <Input name={"Пароль"}
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   type={"password"}
                                   id={"password"}
                                   placeholder={"••••••••"}
                            />
                            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                            <button
                                onClick={onSubmit}
                                type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Войти
                            </button>
                            <p className="text-sm font-light text-gray-400">
                                У вас нет аккаунта? <Link href="/auth/register"
                                                              className="font-medium hover:underline text-primary-500">Зарегистрироваться</Link>
                            </p>
                        </div>
                    </div>
    )
}

Login.getLayout = function getLayout(page: ReactElement) {
    // @ts-ignore
    return (
        <AuthLayout>
            {page}
        </AuthLayout>
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

    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}

export default Login;
