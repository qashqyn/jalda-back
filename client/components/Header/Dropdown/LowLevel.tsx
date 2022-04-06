import Link from "next/link";
import { Subsubcategory } from "../../../data/datas";
import headerStyles from "../Header.module.scss";

interface EndCategoriesProps {
    categories: Subsubcategory[];
}
const LowLevel = ({ categories }: EndCategoriesProps) => {
    return (
        <>
            {categories.map(({ id, name, link }) => (
                <div key={id} className={headerStyles.navLinkContainer}>
                    <Link href={link}>
                        <a>{name}</a>
                    </Link>
                </div>
            ))}
        </>
    );
};

export { LowLevel };
