import logo from '../../assets/logo.svg'
import Image from "next/image";
import Link from "next/link";
import { signIn, getSession, getCsrfToken } from "next-auth/react";
import {MouseEvent, useState} from "react";
import {classNames} from "../../utils/utils";
import Router from 'next/router'

const Login = ({csrfToken}:any) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string>('')

    const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))) {
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
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <Image className="w-12 h-12 mr-2"
                           src={logo} alt="logo"/>
                    MicroHost
                </Link>
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Вход в аккаунт
                        </h1>
                        <div className={classNames(error ? "text-red-600" : "hidden")}>
                            {error}
                        </div>
                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ваша почта</label>
                                <input type="email" name="email" id="email"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="name@gmail.com" required value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                            <button
                                onClick={onSubmit}
                                type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Войти
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                У вас нет аккаунта? <Link href="/auth/register"
                                                              className="font-medium text-primary-600 hover:underline dark:text-primary-500">Зарегистрироваться</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
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
