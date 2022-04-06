import Image from "next/image";
import Link from "next/link";
import { _categories } from "../../data/datas";
import { _contacts, _socials } from "../../data/infos";
import { _paths } from "../../data/paths";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEnvelope, faPhone, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import footerStyles from "./Footer.module.scss";
import { useState } from "react";

const Footer = () => {
    const [sliderStates, setSliderStates] = useState([false, false, false]);

    const onSliderClick = (index: number) => {
        setSliderStates((prevSliderStates) => {
            return prevSliderStates.map((state, i) => {
                if (i === index) return !state;
                return state;
            });
        });
    };

    return (
        <footer className={footerStyles.footer}>
            <div className={`${footerStyles.wrapper} wrapper`}>
                <div className={footerStyles.mainContainer}>
                    <div className={footerStyles.logo}>
                        <Link href="/">
                            <a>
                                <Image src="/logo/LOGO&LABEL_WHITE.png" layout="fill" unoptimized={true} />
                            </a>
                        </Link>
                        <h3>Платформа для аренды чего-угодно</h3>
                    </div>
                    <div className={footerStyles.linksSection}>
                        <div className={`${footerStyles.tabLinks} ${footerStyles.ads} ${sliderStates[0] ? footerStyles.active : ""}`}>
                            <div
                                onClick={() => {
                                    onSliderClick(0);
                                }}
                                className={footerStyles.tabTitle}
                            >
                                <h3>Объявления</h3>
                                <FontAwesomeIcon icon={faAngleDown} className={footerStyles.arrowDown} />
                            </div>
                            <div className={footerStyles.links}>
                                <Link href={_paths.AllAds}>
                                    <a>Все объявления</a>
                                </Link>
                                {_categories.map((category) => (
                                    <Link href={category.link} key={category.id}>
                                        <a>{category.name}</a>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className={`${footerStyles.tabLinks} ${footerStyles.partners} ${sliderStates[1] ? footerStyles.active : ""}`}>
                            <div
                                onClick={() => {
                                    onSliderClick(1);
                                }}
                                className={footerStyles.tabTitle}
                            >
                                <h3>Партнерам</h3>
                                <FontAwesomeIcon icon={faAngleDown} className={footerStyles.arrowDown} />
                            </div>
                            <div className={footerStyles.links}>
                                <Link href={_paths.Partner}>
                                    <a>Стать партнером</a>
                                </Link>
                                <Link href={_paths.PartnerRules}>
                                    <a>Условия и правила</a>
                                </Link>
                            </div>
                        </div>
                        <div className={`${footerStyles.tabLinks} ${footerStyles.about} ${sliderStates[2] ? footerStyles.active : ""}`}>
                            <div
                                onClick={() => {
                                    onSliderClick(2);
                                }}
                                className={footerStyles.tabTitle}
                            >
                                <h3>О нас</h3>
                                <FontAwesomeIcon icon={faAngleDown} className={footerStyles.arrowDown} />
                            </div>
                            <div className={footerStyles.links}>
                                <Link href={_paths.Faq}>
                                    <a>Кто мы и что мы делаем?</a>
                                </Link>
                                <Link href={_paths.Advantages}>
                                    <a>Наши преимущества</a>
                                </Link>
                                <Link href={_paths.Contacts}>
                                    <a>Контакты</a>
                                </Link>
                                <Link href={_paths.ContactWithUs}>
                                    <a>Оставить заявку на консультацию</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={footerStyles.contactsSection}>
                        <div className={footerStyles.contacts}>
                            <ul>
                                <li>
                                    <div>
                                        <FontAwesomeIcon icon={faLocationDot} className={footerStyles.icon} />
                                        <h3>{_contacts.Address}</h3>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <FontAwesomeIcon icon={faEnvelope} className={footerStyles.icon} />
                                        <h3>{_contacts.Email}</h3>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <FontAwesomeIcon icon={faPhone} className={footerStyles.icon} />
                                        <h3>{_contacts.PhoneNumber}</h3>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <FontAwesomeIcon icon={faPhone} className={footerStyles.icon} />
                                        <h3>{_contacts.Number}</h3>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className={footerStyles.socials}>
                            {_socials.map((social) => (
                                <a className={footerStyles.iconContainer} href={social.link} target="_blank" key={social.name}>
                                    <FontAwesomeIcon icon={social.icon} className={footerStyles.icon} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <h5 className={footerStyles.copyright}>© 2022 Jalda. Все права защищены</h5>
            </div>
        </footer>
    );
};

export { Footer };
