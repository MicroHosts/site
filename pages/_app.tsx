import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from "next-auth/react";
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

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
          <SessionProvider session={session}>
            {getLayout(<Component {...pageProps} />)}
          </SessionProvider>
      )
}
