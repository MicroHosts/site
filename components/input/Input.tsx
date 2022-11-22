import {ChangeEventHandler, HTMLInputTypeAttribute} from "react";

export default function Input(
    {
        name,
        value,
        onChange,
        type,
        id,
        placeholder,
        defaultValue
    }:
        {
            name:string,
            value?: any,
            onChange: ChangeEventHandler<HTMLInputElement>,
            type: HTMLInputTypeAttribute,
            id: string,
            placeholder: string,
            defaultValue?: string
        })
{
    return(
        <div>
            <label htmlFor={id}
                   className="block mb-2 text-sm font-medium  text-white">{name}</label>
            <input type={type} name={id} id={id}
                   className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                   placeholder={placeholder} required value={value}
                   onChange={onChange}
                    defaultValue={defaultValue}/>
        </div>
    )
}
