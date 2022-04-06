import Link from "next/link";
import { _categories } from "../../data/datas";
import { _paths } from "../../data/paths";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import headerStyles from "./Header.module.scss";
import { CategoryDropdown } from "./Dropdown/UpLevel";

const Navbar = () => {
    return (
        <div className={headerStyles.navbar}>
            <div className={headerStyles.navLinkContainer}>
                <Link href={_paths.AllAds}>
                    <a className={headerStyles.navLink}>Все объявления</a>
                </Link>
            </div>
            <div className={headerStyles.categories}>
                <span>
                    Категории <FontAwesomeIcon icon={faAngleDown} className={headerStyles.icon} />
                </span>
                <div className={headerStyles.dropdown}>
                    {_categories.map((category, index) => {
                        return (
                            <>
                                <CategoryDropdown
                                    totalSize={_categories.length}
                                    positionNumber={index}
                                    categoryProps={category}
                                    key={category.id}
                                />
                            </>
                        );
                    })}
                </div>
            </div>
            <div className={headerStyles.navLinkContainer}>
                <Link href={_paths.AboutUs}>
                    <a className={headerStyles.navLink}>О Нас</a>
                </Link>
            </div>
            <div className={headerStyles.navLinkContainer}>
                <Link href={_paths.Contacts}>
                    <a className={headerStyles.navLink}>Контакты</a>
                </Link>
            </div>
            <div className={headerStyles.navLinkContainer}>
                <Link href={_paths.HowItWorks}>
                    <a className={headerStyles.navLink}>Как это работает?</a>
                </Link>
            </div>
        </div>
    );
};

export { Navbar };
