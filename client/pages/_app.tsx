import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/general.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="/logo/LOGO.png" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
