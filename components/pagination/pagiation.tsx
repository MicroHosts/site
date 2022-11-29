export default function Pagination({ pageCount, setPage, currentPage }: { pageCount: number, setPage: Function, currentPage: number }) {
    if(pageCount <= 1) return null;
    return (
        <nav className="w-full flex justify-center">
            <ul className="inline-flex -space-x-px">
                <li>
                    <a className="px-3 py-2 ml-0 leading-tight rounded-l-lg  bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                        onClick={() => { setPage(currentPage - 1) }}>Предыдушая</a>
                </li>
                {[...Array(pageCount)].map((_, i) => (
                    <li key={i}>
                        <a className="px-3 py-2 leading-tight bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white" onClick={() => setPage(i+1)}>{i + 1}</a>
                    </li>
                ))}
                <li>
                    <a className="px-3 py-2 leading-tight border rounded-r-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                        onClick={() => { setPage(currentPage + 1) }}>Следующая</a>
                </li>
            </ul>
        </nav>
    )
}