import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
import { useRecoilValue } from "recoil";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const memoize = (fn: any) => {
  let cache = {};
  return (...args: any) => {
    let n = args[0];
    if (n in cache) {
      //@ts-ignore
      return cache[n];
    }
    else {
      let result = fn(n);
      //@ts-ignore
      cache[n] = result;
      return result;
    }
  }
}
//@ts-ignore
const mutedConsole = memoize((console) => ({
  ...console,
  warn: (...args: any) => args[0].includes('Duplicate atom key')
    ? null
    : console.warn(...args)
}))

global.console = mutedConsole(global.console);


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <MyApp Component={Component} pageProps={pageProps} />
      </SessionProvider>

    </RecoilRoot>
  )
}

function MyApp({ Component, pageProps }:any) {
  const getLayout = Component.getLayout ?? ((page:any) => page)
  return (
    <>
      {getLayout(<Component {...pageProps} />)}
    </>

  )

}
