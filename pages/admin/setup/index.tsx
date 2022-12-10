
import {LegacyRef, MouseEvent, ReactElement, useRef, useState} from "react"
import {checkAdmin} from "@/models/user";
import AuthLayout from "@/layouts/Auth";
import {classNames, validateEmail} from "@/utils/utils";
import Router from "next/router";
import Input from "@/components/input/Input";
import Link from "next/link";

function Index(){
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [passwordConfirm, setPasswordConfirm] = useState<string>('')
    const [error, setError] = useState<string>('')

    const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
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
        const res = await fetch('/api/auth/admin', {
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
        }
        return Router.push("/admin")
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
                <Input name={"Имя пользователя"}
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       type={"text"}
                       id={"username"}
                       placeholder={"Имя пользователя"}
                />
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
                <Input name={"Пароль"}
                       value={passwordConfirm}
                       onChange={(e) => setPasswordConfirm(e.target.value)}
                       type={"password"}
                       id={"confirm-password"}
                       placeholder={"••••••••"}
                />
                <button type="submit"
                        onClick={onSubmit}
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">
                    Создать админа
                </button>
            </div>
        </div>
    )
}

Index.getLayout = function getLayout(page: ReactElement) {
    return (
        <AuthLayout>
            {page}
        </AuthLayout>
    )
}


export async function getStaticProps() {
    const admin = await checkAdmin()
    if(admin){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: {
        }
    }
}

export default Index
