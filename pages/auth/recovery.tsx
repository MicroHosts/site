import {LegacyRef, ReactElement, useRef, useState} from "react";
import AuthLayout from "@/layouts/Auth";
import {classNames, validateEmail} from "@/utils/utils";
import Input from "@/components/input/Input";

function Recovery(){
    const [email, setEmail] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const checked: LegacyRef<HTMLInputElement>  = useRef(null);

    const onSubmit = async(e:any) => {
        e.preventDefault()
        if(checked.current === null || !checked.current.checked) {
            setError('Вы должны принять условия конфиденциальности')
            return
        }
        if(!validateEmail(email)){
            setError('Некорректный email')
            return
        }
        setError('')
        const res = await fetch('/api/auth/recovery', {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({email})
        })
        let data = await res.json()
        if(res.status == 422){
            setError(data.message);
        }
        if(res.status == 200){
            setError('')
            setSuccess(data.message)
        }
    }

    return(
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                Забыли пароль?
                Напиши вашу почту и мы отправим вам ссылку для восстановления пароля
            </h1>
            <div className={classNames(error ? "text-red-600" : "hidden")}>
                {error}
            </div>
            <div className={classNames(success ? "text-green-600" : "hidden")}>
                {success}
            </div>
            <div className="space-y-4 md:space-y-6">
                <Input name={"Ваша почта"}
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       type={"email"}
                       id={"email"}
                       placeholder={"name@gmail.com"}
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
                            принимаю <a
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                href="#">условия конфидециальности</a></label>
                    </div>
                </div>
                <button
                    onClick={onSubmit}
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Восстановить
                </button>
            </div>
        </div>
    )
}

Recovery.getLayout = function getLayout(page: ReactElement) {
    return (
        <AuthLayout>
            {page}
        </AuthLayout>
    )
}

export default Recovery
