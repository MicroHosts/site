export default function Pagination({data, setPage}: {data: any, setPage: Function}){
    
    return(
        <nav className="w-full flex justify-center">
        <ul className="inline-flex -space-x-px">
            <li>
                <a href="#" className="px-3 py-2 ml-0 leading-tight rounded-l-lg  bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">Предыдушая</a>
            </li>
            <li>
                <a href="#" className="px-3 py-2 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">1</a>
            </li>
            <li>
                <a href="#" className="px-3 py-2 leading-tight border  bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">1</a>
            </li>
            <li>
                <a href="#" className="px-3 py-2 leading-tight border rounded-r-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">Следующая</a>
            </li>
        </ul>
    </nav>
    )
}