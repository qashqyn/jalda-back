import Image from "next/image";
import Link from "next/link";
import AliceCarousel from "react-alice-carousel";
import Layout from "../components/Layout";
import { _categories, _adventages, PairAdvantage, Advantage } from "../data/datas";
import { _frequentRequests } from "../data/frequentRequests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import mainStyles from "../styles/Main.module.scss";
import { useRouter } from "next/router";

interface AdvantagePairProps {
    pair: Advantage[];
}

const AdvantagePair = ({ pair }: AdvantagePairProps) => (
    <>
        {pair.map((adv) => (
            <div className={mainStyles.item} key={adv.id}>
                <div>
                    <Image src={adv.iconUrl} width={90} height={90} layout="fixed" />
                </div>
                <h3>{adv.title}</h3>
                <p>{adv.text}</p>
            </div>
        ))}
    </>
);

const handleDragStart = (e) => {
    alert(1);
    e.preventDefault();
};

const IndexPage = () => {
    const declensionNumeralsReq = (num: number) => {
        const digit = num % 10;
        if (11 <= num && num <= 20) return `${num} объявлений`;
        else if (digit === 1) return `${num} объявление`;
        else if (2 <= digit && digit <= 4) return `${num} объявления`;
        else if ((5 <= digit && digit <= 9) || digit === 0) return `${num} объявлений`;
    };
    return (
        <Layout title="Платформа для аренды чего угодно | Jalda" isMainPage>
            <div className={mainStyles.heroBlock}>
                <div>
                    <h1>Зачем покупать, когда можно арендовать?</h1>
                    <h2>Платформа для аренды чего угодно</h2>
                    <div className={mainStyles.searchBar}>
                        <input type="search" placeholder="Я ищу..." />
                        <button>Найти</button>
                    </div>
                </div>
                <a
                    className={mainStyles.arrowDown}
                    onClick={() => {
                        window.scrollTo({
                            top: window.innerHeight - 80,
                        });
                    }}
                >
                    <FontAwesomeIcon icon={faAnglesDown} className={mainStyles.icon} />
                    <div />
                </a>
            </div>
            <div className="wrapper">
                <div className={mainStyles.categories} id="categoriesPart">
                    {_categories.map((category) => (
                        <Link key={category.id} href={category.link}>
                            <a className={mainStyles.category}>
                                <h3>{category.name}</h3>
                                <div className={mainStyles.overlay} />
                                <Image
                                    src={category.previewUrl}
                                    layout="fill"
                                    objectFit="cover"
                                    objectPosition="center center"
                                    className={mainStyles.image}
                                />
                            </a>
                        </Link>
                    ))}
                </div>
                <div className={mainStyles.adventages}>
                    <h1 className={mainStyles.title}>Наши преимущества</h1>
                    <div className={mainStyles.container}>
                        {_adventages.map((advantagePair) => (
                            <div key={advantagePair.id}>
                                <AdvantagePair pair={advantagePair.pair} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={mainStyles.frequentRequests}>
                <div className={mainStyles.title}>Частые запросы</div>
                <div className={mainStyles.container}>
                    <AliceCarousel
                        autoWidth
                        autoPlay
                        mouseTracking
                        infinite
                        animationDuration={400}
                        autoPlayInterval={2000}
                        disableButtonsControls
                        disableDotsControls
                    >
                        {_frequentRequests.map((request) => (
                            <div
                                key={request.id}
                                className={mainStyles.item}
                                onDragStart={handleDragStart}
                                onClick={() => {
                                    alert("111");
                                }}
                            >
                                <Link href={request.link} key={request.id}>
                                    <a
                                        className={mainStyles.link}
                                        onClick={(event) => {
                                            event.preventDefault();
                                        }}
                                    >
                                        <div className={mainStyles.imageContainer}>
                                            <Image src={request.previewUrl} layout="fill" objectFit="cover" className={mainStyles.image} />
                                        </div>
                                        <div className={mainStyles.content}>
                                            <h3>{request.title}</h3>
                                            <h4>{declensionNumeralsReq(request.count)}</h4>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        ))}
                    </AliceCarousel>
                </div>
            </div>
        </Layout>
    );
};

export default IndexPage;
