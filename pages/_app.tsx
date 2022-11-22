import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from "next-auth/react";
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from "react-toastify";
import {RecoilRoot} from "recoil";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({
                              Component,
                              pageProps: {session, ...pageProps},
}: AppProps) {
  const getLayout = Component.getLayout ?? ((page) => page)

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
              {getLayout(<Component {...pageProps} />)}
          </SessionProvider>
      </RecoilRoot>
      )
}
