export type Subsubcategory = {
    id: number;
    name: string;
    link: string;
};
export type Subcategory = {
    id: number;
    name: string;
    link: string;
    subcategories?: Subsubcategory[];
};
export type Category = {
    id: number;
    name: string;
    link: string;
    previewUrl: string;
    subcategories?: Subcategory[];
};

const _categories: Category[] = [
    {
        id: 1,
        name: "Помещения",
        link: "/categories/rooms",
        previewUrl:
            "https://img.freepik.com/free-photo/tv-cabinet-in-modern-living-room-with-armchair-and-plant-on-dark-marble-wall-3d-rendering_41470-3512.jpg?t=st=1648807211~exp=1648807811~hmac=bad5d7a2b0705d7acc53bab9d8a8cfc18df259e3920206f3e0b9cd4c78850cf4&w=1060",
        subcategories: [
            {
                id: 1,
                name: "Деловые",
                link: "/categories/business",
                subcategories: [
                    { id: 1, name: "Тимбилдинг", link: "/categories/teambuilding" },
                    { id: 2, name: "Курсы / уроки", link: "/categories/lessons" },
                    { id: 3, name: "Кулинарный мастер-класс", link: "/categories/culinary" },
                    { id: 4, name: "Конференц залы", link: "/categories/conference" },
                    { id: 5, name: "Коворкинг / офис", link: "/categories/coworking" },
                    { id: 6, name: "Запись интервью / подкаст", link: "/categories/interview" },
                    { id: 7, name: "Фотосъёмка / Видеосъемка", link: "/categories/photography" },
                ],
            },
            {
                id: 2,
                name: "Спортивные",
                link: "/categories/sport",
                subcategories: [
                    {
                        id: 1,
                        name: "Стадионы / Залы / Площадки",
                        link: "/categories/stadium",
                    },
                    {
                        id: 2,
                        name: "Стречинг / Йога",
                        link: "/categories/yoga",
                    },
                    {
                        id: 3,
                        name: "Танцевальный класс",
                        link: "/categories/dance",
                    },
                ],
            },
            {
                id: 3,
                name: "Кинопоказ",
                link: "/categories/movie",
            },
            {
                id: 4,
                name: "Празднование",
                link: "/categories/celebration",
            },
            {
                id: 5,
                name: "Выставка",
                link: "/categories/exhibition",
            },
        ],
    },
    {
        id: 2,
        name: "Одежда и аксессуары",
        link: "/categories/clothes",
        previewUrl:
            "https://img.freepik.com/free-photo/beautiful-masks-pieces-clothes_23-2147745290.jpg?t=st=1648807491~exp=1648808091~hmac=55a3595d83957fed7c6229934272ad4c02a6253ddeb0cc2b1ba2539414b084ca&w=996",
        subcategories: [
            {
                id: 1,
                name: "Сценическая одежда",
                link: "/categories/stage",
            },
            {
                id: 2,
                name: "Спортивная одежда",
                link: "/categories/sport",
            },
        ],
    },
    {
        id: 3,
        name: "Предметы - Вещи",
        link: "/categories/objects",
        previewUrl: "https://images.pexels.com/photos/4246091/pexels-photo-4246091.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        subcategories: [
            {
                id: 1,
                name: "Спортивные снарежения",
                link: "/categories/sport",
            },
            {
                id: 2,
                name: "Техника",
                link: "/categories/technic",
            },
            {
                id: 3,
                name: "Транспорт",
                link: "/categories/transport",
            },
            {
                id: 4,
                name: "Другие",
                link: "/categories/other",
            },
        ],
    },
];

export type Advantage = {
    id: number;
    iconUrl: string;
    title: string;
    text: string;
};
export type PairAdvantage = {
    id: number;
    pair: Advantage[];
};

const _adventages: PairAdvantage[] = [
    {
        id: 1,
        pair: [
            {
                id: 1,
                iconUrl: "/icons/convenience.svg",
                title: "Удобство",
                text: "Даём возможность арендовать, бронировать всё на одном удобном сайте.",
            },
            {
                id: 2,
                iconUrl: "/icons/savingTime.svg",
                title: "Экономия времени",
                text: "Сэкономим ваше время для поиска нужного ассортимента.",
            },
        ],
    },
    {
        id: 2,
        pair: [
            {
                id: 1,
                iconUrl: "/icons/safely.svg",
                title: "Безопасно",
                text: "Помогаем владельцам и арендаторам находить друг друга и совершать безопасные сделки онлайн.",
            },
            {
                id: 2,
                iconUrl: "/icons/commission.svg",
                title: "Бронирование без комиссии",
                text: "Мы не взимаем комиссию за оформление бронирования или другие услуги.",
            },
        ],
    },
];

export { _categories, _adventages };
