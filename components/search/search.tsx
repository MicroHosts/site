import { BiSearch } from "react-icons/bi";

export default function Search({ search, setSearch, onClick }: { search: string, setSearch: Function, onClick?: any }) {
    return (
        <>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only text-white">Поиск</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <BiSearch className="w-5 h-5 text-gray-400" />
                </div>
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="search" id="default-search" className="block w-full p-4 pl-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Название" required value={search} />
                <button type="submit" className="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                    onClick={onClick}
                >Искать</button>
            </div>
        </>
    )
}