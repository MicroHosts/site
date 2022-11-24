import { BiLoaderCircle } from 'react-icons/bi'

export default function Loader() {
    return (
        <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
                <BiLoaderCircle className="w-16 h-16 rounded-full text-blue-600 animate-spin" />
            </div>
        </div>
    )
}