import { faFacebookF as faFacebook, faInstagram, faYoutube, faVk } from "@fortawesome/free-brands-svg-icons";

type Contact = Record<string, string>;

const _contacts: Contact = {
    Address: "г.Алматы, 4 мкр-н 3а",
    Email: "jalda.support@gmail.com",
    PhoneNumber: "+7 (777) 777-77-77",
    Number: "777-77-77",
};

type Social = {
    id: number;
    name: string;
    icon: any;
    link: string;
};

const _socials: Social[] = [
    {
        id: 1,
        name: "Facebook",
        icon: faFacebook,
        link: "https://www.facebook.com/",
    },
    {
        id: 2,
        name: "Instagram",
        icon: faInstagram,
        link: "https://www.instagram.com/",
    },
    {
        id: 3,
        name: "YouTube",
        icon: faYoutube,
        link: "https://www.youtube.com/channel/UC7uqem40x61Fpxi_a8APtwQ",
    },
    {
        id: 4,
        name: "VK",
        icon: faVk,
        link: "https://vk.com/",
    },
];

export { _contacts, _socials };
