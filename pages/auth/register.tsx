import Link from "next/link";
import {LegacyRef, MouseEvent, ReactElement, useRef, useState} from "react";
import {classNames, validateEmail} from "@/utils/utils";
import AuthLayout from "@/layouts/Auth";
import Input from "@/components/input/Input";
import {getCsrfToken, getSession} from "next-auth/react";
import Router from "next/router";

const Register = () => {
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
        const res = await fetch('/api/auth/createUser', {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email, password
            },
            )
        })
        let data = await res.json()
        if(res.status != 200){
            setError(data.message);
            return
        }
        if(res.status == 200){
            setError('')
        }
        return Router.push("https://churkahost.float-zone.com:4083/")
    }

    return (
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                            Создать аккаунт
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
                            <Input name={"Повторный пароль"}
                                   value={passwordConfirm}
                                   onChange={(e) => setPasswordConfirm(e.target.value)}
                                   type={"password"}
                                   id={"confirm-password"}
                                   placeholder={"••••••••"}
                            />
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox"
                                           className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 focus:ring-primary-600 ring-offset-gray-800"
                                           required
                                           ref={checked}
                                           />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500">Я
                                        принимаю <Link
                                            className="font-medium hover:underline text-primary-500"
                                            href="/privacy">условия конфидециальности</Link> и <Link className="font-medium hover:underline text-primary-500" href="/terms">условия пользования</Link></label>
                                </div>
                            </div>
                            <button type="submit"
                                    onClick={onSubmit}
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Зарегистрироваться
                            </button>
                            <p className="text-sm font-light  text-gray-400">
                                У вас уже есть аккаунт? <Link href="https://churkahost.float-zone.com:4083/"
                                                              className="font-medium hover:underline text-primary-500">Войти</Link>
                            </p>
                            {/*<p className="text-sm font-light  text-gray-400">*/}
                            {/*    Забыли пароль? <Link href="/auth/recovery"*/}
                            {/*                                  className="font-medium hover:underline text-primary-500">Войти</Link>*/}
                            {/*</p>*/}
                        </div>
                    </div>
    )
};

Register.getLayout = function getLayout(page: ReactElement) {
    // @ts-ignore
    return (
        <AuthLayout>
            {page}
        </AuthLayout>
    )
}


export default Register;
