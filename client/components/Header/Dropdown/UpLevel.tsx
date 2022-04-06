import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Category } from "../../../data/datas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight as fasAngleRight } from "@fortawesome/free-solid-svg-icons";
import variables from "../Header.module.scss";
import headerStyles from "../Header.module.scss";
import { MidLevel } from "./MidLevel";

interface CategoryDropdownProps {
    totalSize: number;
    positionNumber: number;
    categoryProps: Category;
}

const CategoryDropdown = ({ totalSize, positionNumber, categoryProps }: CategoryDropdownProps) => {
    const { name: name, link: link, subcategories: subcategories } = categoryProps;

    const [isTabActive, setTabActive] = useState(false);

    const toggleActive = () => {
        setTabActive(!isTabActive);
    };

    const [tabHeights, setTabHeights] = useState([]);
    const [totalDistances, setTotalDistances] = useState([0, 0, 0]);
    const [dropdownHeights, setDropdownHeights] = useState([]);

    useEffect(() => {
        setTabHeights((prevTabHeights) => {
            for (let i = 0; i < 3; i++) {
                prevTabHeights[i] = Number.parseInt(variables[`tabHeight_${i}`].substring(0, variables[`tabHeight_${i}`].length - 2));
            }
            setTotalDistances((prevTotalDistances) => {
                for (let i = 0; i < 3; i++) {
                    prevTotalDistances[i] = prevTabHeights[i] * positionNumber;
                }
                return prevTotalDistances;
            });
            setDropdownHeights((prevDropdownHeights) => {
                for (let i = 0; i < 3; i++) {
                    prevDropdownHeights[i] = totalSize * prevTabHeights[i] - 1;
                }
                return prevDropdownHeights;
            });
            return prevTabHeights;
        });
    }, []);

    return (
        <div className={headerStyles.upLevel}>
            <div className={`${headerStyles.navLinkContainer} ${isTabActive && headerStyles.active}`} onClick={toggleActive}>
                <Link href={link}>
                    <a className="upLevel">{name}</a>
                </Link>
                <FontAwesomeIcon icon={fasAngleRight} className={headerStyles.arrowDown} />
            </div>
            <div className={`${headerStyles.midLevel} midLevel_${positionNumber}`}>
                {subcategories &&
                    subcategories.map((midCategory) => {
                        return <MidLevel key={midCategory.id} {...midCategory} />;
                    })}
            </div>
            <style jsx>{`
                .midLevel_${positionNumber} {
                    transform: translate(100%, -${totalDistances[0]}px);
                    min-height: ${dropdownHeights[0]}px;
                }
                @media screen and (max-width: 1200px) {
                    .midLevel_${positionNumber} {
                        transform: translate(100%, -${totalDistances[1]}px);
                        min-height: ${dropdownHeights[1]}px;
                    }
                }
                @media screen and (max-width: 992px) {
                    .midLevel_${positionNumber} {
                        transform: translate(100%, -${totalDistances[2]}px);
                        min-height: ${dropdownHeights[2]}px;
                    }
                }
            `}</style>
        </div>
    );
};

export { CategoryDropdown };
