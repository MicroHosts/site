import logo from '../../assets/logo.svg'
import Image from "next/image";
import Link from "next/link";
import {LegacyRef, MouseEvent, useRef, useState} from "react";
import {classNames, validateEmail} from "../../utils/utils";

const Register = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [passwordConfirm, setPasswordConfirm] = useState<string>('')
    const [error, setError] = useState<string>('')
    const checked: LegacyRef<HTMLInputElement>  = useRef(null);

    const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(checked.current === null || !checked.current.checked) {
            setError('Вы должны принять условия использования')
            return
        }
        if(password !== passwordConfirm){
            setError('Пароли не совпадают')
            return
        }
        if(username.length < 3){
            setError('Имя пользователя должно быть больше 3 символов')
            return
        }
        if(password.length < 6){
            setError('Пароль должен быть больше 6 символов')
            return
        }
        if(password.length > 20){
            setError('Пароль должен быть меньше 20 символов')
            return
        }
        if(email.length < 6 && !validateEmail(email)){
            setError('Некорректный email')
            return
        }
        setError('')
        const res = await fetch('/api/auth/signup', {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email, username, password
            },
            )
        })
        let data = await res.json()
        if(res.status == 422){
            setError(data.message);
        }
        if(res.status == 200){
            setError('')
            console.log(data)
        }
    }

    return (
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
                            Создать аккаунт
                        </h1>
                        <div className={classNames(error ? "text-red-600" : "hidden")}>
                            {error}
                        </div>
                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="username"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Имя пользователя
                                </label>
                                <input type="text" name="username" id="username" placeholder={"Имя пользователя"}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required
                                       value={username}
                                       onChange={e => setUsername(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ваша
                                    почта</label>
                                <input type="email" name="email" id="email"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="name@gmail.com" required
                                       value={email}
                                       onChange={e => setEmail(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required
                                       value={password}
                                       onChange={e => setPassword(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="confirm-password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Повторите
                                    пароль</label>
                                <input type="password" name="confirm-password" id="confirm-password"
                                       placeholder="••••••••"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required
                                       value={passwordConfirm}
                                       onChange={e => setPasswordConfirm(e.target.value)}/>
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox"
                                           className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                           required
                                           ref={checked}
                                           />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">Я
                                        принимаю <a
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            href="#">условия обработки персональных данных</a></label>
                                </div>
                            </div>
                            <button type="submit"
                                    onClick={onSubmit}
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Зарегистрироваться
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                У вас уже есть аккаунт? <Link href="/auth/login"
                                                              className="font-medium text-primary-600 hover:underline dark:text-primary-500">Войти</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Register;
