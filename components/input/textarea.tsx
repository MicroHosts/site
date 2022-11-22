export default function TextArea(
    { name,
        value,
        onChange,
        id,
        defaultValue,
        placeholder }: {
             name: string,
              value?: string,
        defaultValue?: string,
              onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
               id: string,
                placeholder: string }) {
    return (
        <>
            <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-white"

            >{name}</label>
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                defaultValue={defaultValue}
                rows={3}
                className="block p-2.5 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder={placeholder}
            >
                </textarea>
        </>
    )
}
