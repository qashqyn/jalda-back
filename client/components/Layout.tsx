import React, { ReactNode } from "react";
import Head from "next/head";
import { Header } from "./Header";
import { Footer } from "./Footer";

type Props = {
    children?: ReactNode;
    title?: string;
    isMainPage?: boolean;
};

const Layout = ({ children, title = "Default title", isMainPage = false }: Props) => (
    <>
        <Head>
            <title>{title}</title>
        </Head>
        <Header isMainPage={isMainPage} />
        <article>{children}</article>
        <Footer />
    </>
);

export default Layout;
