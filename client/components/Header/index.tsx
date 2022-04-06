import Image from "next/image";
import Link from "next/link";
import { Navbar } from "./Navbar";
import { _paths } from "../../data/paths";
import { _contacts, _socials } from "../../data/infos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faHeart as farHeart, faBell as farBell, faUser as farUser } from "@fortawesome/free-regular-svg-icons";
import {
    faMagnifyingGlass as fasMagnifyingGlass,
    faBars as fasBars,
    faPhone as fasPhone,
    faXmark as fasXmark,
} from "@fortawesome/free-solid-svg-icons";
import headerStyles from "./Header.module.scss";
import { useState } from "react";

interface HeaderProps {
    isMainPage: boolean;
}

type User = {
    name: string;
};

enum NotificationStatus {
    inProcessing = "inProcessing",
    awaitingPayment = "awaitingPayment",
    rejected = "rejected",
    completed = "completed",
}

type Notification = {
    id: number;
    title: string;
    date: Date;
    readStatus: boolean;
    status: NotificationStatus;
};

const Header = ({ isMainPage }: HeaderProps) => {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const isAuthorized = true;
    const user: User = { name: "Мухаммедали" };
    const fakeNofis: Notification[] = [
        {
            id: 2,
            title: "Магазин “Skadi” подтвердил вашу заявку. Произведите оплату перейдя в личный кабинет",
            date: new Date("December 17, 2021 19:30:00"),
            readStatus: false,
            status: NotificationStatus.awaitingPayment,
        },
        {
            id: 1,
            title: "Магазин “Skadi” принял вашу оплату. Операция успешно завершена.",
            date: new Date("November 28, 2021 11:58:00"),
            readStatus: true,
            status: NotificationStatus.completed,
        },
        {
            id: 3,
            title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident facere error maiores blanditiis cupiditate hic, esse quaerat aperiam eligendi, voluptatibus minus et tenetur eveniet laboriosam quo laudantium vitae sequi aliquam.",
            date: new Date("November 28, 2021 11:58:00"),
            readStatus: true,
            status: NotificationStatus.inProcessing,
        },
        {
            id: 4,
            title: "Магазин “Skadi” отклонил вашу оплату.",
            date: new Date("November 28, 2021 11:58:00"),
            readStatus: true,
            status: NotificationStatus.rejected,
        },
    ];
    // const fakeNofis: Notification[] = [];

    const [isBurgerActive, setBurgerActive] = useState(false);
    const [isNotifActive, setNotifActive] = useState(false);

    const onToggleBurger = () => {
        setBurgerActive(!isBurgerActive);
    };

    const onToggleNotif = () => {
        setNotifActive(!isNotifActive);
    };

    return (
        <header className={headerStyles.header}>
            <div className={`${headerStyles.wrapper} wrapper`}>
                <div className={headerStyles.logo}>
                    <Link href={_paths.Main}>
                        <a>
                            <Image src="/logo/LOGO&LABEL.png" alt="Jalda logo" layout="fill" unoptimized={true} />
                        </a>
                    </Link>
                </div>
                <FontAwesomeIcon icon={isBurgerActive ? fasXmark : fasBars} className={headerStyles.burgerBtn} onClick={onToggleBurger} />
                <div className={`${headerStyles.burgerMenu} ${isBurgerActive ? headerStyles.active : null}`}>
                    <Navbar />
                    <div className={headerStyles.rightSide}>
                        <div className={headerStyles.buttons}>
                            {!isMainPage && (
                                <div className={headerStyles.navLinkContainer}>
                                    <span className={headerStyles.searchBtn}>
                                        <FontAwesomeIcon icon={fasMagnifyingGlass} className={headerStyles.icon} />
                                        <span className={headerStyles.title}>Поиск</span>
                                    </span>
                                </div>
                            )}
                            <div className={headerStyles.navLinkContainer}>
                                <span className={headerStyles.heart}>
                                    <FontAwesomeIcon icon={farHeart} className={headerStyles.icon} />
                                    <span className={headerStyles.title}>Избранные</span>
                                </span>
                            </div>
                            {isAuthorized && (
                                <div className={headerStyles.navLinkContainer}>
                                    <span className={`${headerStyles.notification} ${isNotifActive && headerStyles.active}`}>
                                        <div onClick={onToggleNotif}>
                                            <FontAwesomeIcon icon={farBell} className={headerStyles.icon} />
                                            <span className={headerStyles.title}>Уведомления</span>
                                        </div>
                                        <div className={headerStyles.dropdown}>
                                            <h3>Уведомления</h3>
                                            <div className={headerStyles.notifsContainer}>
                                                {fakeNofis.length > 0 ? (
                                                    fakeNofis.map((notif, index) => (
                                                        <>
                                                            <div
                                                                key={notif.id}
                                                                className={`${headerStyles.container} ${
                                                                    notif.status === "inProcessing"
                                                                        ? headerStyles.inProcessing
                                                                        : notif.status === "awaitingPayment"
                                                                        ? headerStyles.awaitingPayment
                                                                        : notif.status === "rejected"
                                                                        ? headerStyles.rejected
                                                                        : headerStyles.completed
                                                                } ${!notif.readStatus && headerStyles.new}`}
                                                            >
                                                                <div className={headerStyles.statusLine} />
                                                                <div className={headerStyles.content}>
                                                                    <h4>{notif.title}</h4>
                                                                    <span>
                                                                        <FontAwesomeIcon icon={faClock} className={headerStyles.icon} />
                                                                        {notif.date.getDate()} {monthNames[notif.date.getMonth()]},{" "}
                                                                        {notif.date.getHours()}:{notif.date.getMinutes()}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                        </>
                                                    ))
                                                ) : (
                                                    <h4>У вас пока нет уведомлений</h4>
                                                )}
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className={headerStyles.navLinkContainer}>
                            {isAuthorized ? (
                                <div className={headerStyles.login}>
                                    <FontAwesomeIcon icon={farUser} className={headerStyles.icon} />
                                    <span className={headerStyles.title}>{user.name}</span>
                                </div>
                            ) : (
                                <div className={headerStyles.login}>
                                    <FontAwesomeIcon icon={farUser} className={headerStyles.icon} />
                                    <span className={headerStyles.title}>Войти</span>
                                </div>
                            )}
                        </div>
                        <div className={headerStyles.contacts}>
                            <ul>
                                <li>
                                    <div>
                                        <FontAwesomeIcon icon={fasPhone} className={headerStyles.icon} />
                                        <h3>{_contacts.PhoneNumber}</h3>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <FontAwesomeIcon icon={fasPhone} className={headerStyles.icon} />
                                        <h3>{_contacts.Number}</h3>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className={headerStyles.socials}>
                            {_socials.map((social) => (
                                <a className={headerStyles.iconContainer} href={social.link} target="_blank" key={social.name}>
                                    <FontAwesomeIcon icon={social.icon} className={headerStyles.icon} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export { Header };
