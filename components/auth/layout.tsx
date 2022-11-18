import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({children}:any){
    return(
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-white">
                    <Image className="w-12 h-12 mr-2"
                           src="/logo.svg" alt="logo" height={200} width={200}/>
                    MicroHost
                </Link>
                <div
                    className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 order-gray-700">
                    {children}
                </div>
            </div>
        </section>
    )
}

