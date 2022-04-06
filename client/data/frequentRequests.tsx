type FrequentRequest = {
    id: number;
    title: string;
    count: number;
    previewUrl: string;
    link: string;
};

const _frequentRequests: FrequentRequest[] = [
    {
        id: 1,
        title: "Караоке",
        count: 75,
        previewUrl:
            "https://images.unsplash.com/photo-1560297035-0ed84c4175f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        link: "/categories/?search=Караоке",
    },
    {
        id: 2,
        title: "Сценическая одежда",
        count: 31,
        previewUrl:
            "https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
        link: "/categories/?search=Сценическая+одежда",
    },
    {
        id: 3,
        title: "PlayStation",
        count: 28,
        previewUrl:
            "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        link: "/categories/?search=PlayStation",
    },
    {
        id: 4,
        title: "Сноуборды",
        count: 84,
        previewUrl:
            "https://img.freepik.com/free-photo/closeup-of-a-female-snowboarder-in-motion-on-a-snowboard-in-a-mountain_181624-41342.jpg?t=st=1648845168~exp=1648845768~hmac=cf2fbb5ab644baa0d7b8b7c3162beff9298c1f7e65dcb0eb97c6ac19cfe30d1a&w=996",
        link: "/categories/?search=Сноуборды",
    },
    {
        id: 5,
        title: "Коворкинг",
        count: 30,
        previewUrl:
            "https://images.unsplash.com/photo-1600508773950-d522f5bb7606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        link: "/categories/?search=Караоке",
    },
];

export { _frequentRequests };
