import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight as fasAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Subcategory } from "../../../data/datas";
import headerStyles from "../Header.module.scss";
import { LowLevel } from "./LowLevel";
import { useState } from "react";

const MidLevel = ({ name, link, subcategories }: Subcategory) => {
    const [isTabActive, setTabActive] = useState(false);

    const toggleActive = () => {
        setTabActive(!isTabActive);
    };

    return (
        <div>
            <div className={`${headerStyles.navLinkContainer} ${isTabActive && headerStyles.active}`} onClick={toggleActive}>
                <Link href={link}>
                    <a>{name}</a>
                </Link>

                {subcategories && <FontAwesomeIcon icon={fasAngleRight} className={headerStyles.arrowDown} />}
            </div>

            <div className={headerStyles.lowLevel}>{subcategories && <LowLevel categories={subcategories} />}</div>
        </div>
    );
};
export { MidLevel };
