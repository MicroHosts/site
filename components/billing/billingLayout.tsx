import styles from "../../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";
import {signOut} from "next-auth/react";
import Image from "next/image";
import logo from "../../assets/logo.svg";
import useUser from "../../components/hooks/useUser";
import Header from "../../components/billing/header/Header";
import { classNames } from "../../utils/utils";
import { NextPageWithLayout } from "../../pages/_app";


export default function BillingLayout({children}:{children: NextPageWithLayout}) {
    const { user, isLoading, isError } = useUser();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if(isError){
        return <div>Ошибка</div>;
    }
    return(
        <div className={styles.container}>
            <Head>
                <title>Биллинг</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div>
                <nav className="md:px-2 py-2.5">
                    <div className="flex flex-wrap justify-between items-center mx-auto mt-4 md:mt-0">
                        <Link href="/" className="flex items-center">
                            <Image className="w-12 h-12 mr-2"
                                   src={logo} alt="logo"/>
                            <span
                                className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MicroHost</span>
                        </Link>
                        <div className={classNames( "md:block md:w-auto")}>
                            <button onClick={() => signOut({callbackUrl: "/", redirect: true})}
                                  className="md:ml-0 ml-4 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-lg px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none">Выйти
                            </button>
                        </div>
                    </div>
                </nav>
                <div className="md:flex">
                    <Header user={user}/>
                    <>{children}</>
                </div>
            </div>
        </div>
    )
}

