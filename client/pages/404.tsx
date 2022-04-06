import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import errorStyles from "../styles/Error.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";
import { useEffect, useState } from "react";

export default function ErrorPage() {
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        setInterval(async () => {
            await setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
    }, []);

    useEffect(() => {
        if (timer <= 0) Router.push("/");
    }, [timer]);

    const declensionNumeralsTimer = (num: number) => {
        const digit = num % 10;
        if (11 <= num && num <= 20) return `${num} секунд`;
        else if (digit === 1) return `${num} секунду`;
        else if (2 <= digit && digit <= 4) return `${num} секунды`;
        else if ((5 <= digit && digit <= 9) || digit === 0) return `${num} секунд`;
    };

    return (
        <Layout>
            <div className={errorStyles.container}>
                <h1>Упссс!</h1>
                <div className={errorStyles.imageContainer}>
                    <Image src="/icons/404.svg" layout="fill" priority objectFit="cover" />
                </div>
                <Link href="/">
                    <a className={errorStyles.link}>
                        <FontAwesomeIcon icon={faArrowLeft} className={errorStyles.icon} />
                        <span>Вернуться на главную</span>
                    </a>
                </Link>
                <span className={errorStyles.timer}>Авто перемещение через {declensionNumeralsTimer(timer)}...</span>
            </div>
        </Layout>
    );
}
