export interface Solution {
    id: string;
    name: string;
    image: string;
    description: string;
    items: string[];
    price: string;
}

export const solutions: Solution[] = [
    {
        id: "dj",
        name: "Диджей-комплекты",
        image: "https://images.unsplash.com/photo-1571266028243-3716f02d2d56?w=600&h=400&fit=crop&q=80",
        description: "Полный комплект для DJ-сета на мероприятии любого масштаба",
        items: [
            "Pioneer CDJ 3000 × 2",
            "Pioneer DJM NXS2",
            "Мониторы",
            "Наушники",
            "Коммутация",
        ],
        price: "от 25 000 ₽",
    },
    {
        id: "concert",
        name: "Концертное оборудование",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop&q=80",
        description: "Профессиональный звук и свет для живых выступлений",
        items: [
            "Линейный массив L-Acoustics",
            "Мониторная система",
            "Микшерный пульт Yamaha CL5",
            "Микрофоны Shure",
            "Световое оборудование",
            "Коммутация + монтаж",
        ],
        price: "от 80 000 ₽",
    },
    {
        id: "conference",
        name: "Бизнес-конференции",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&q=80",
        description: "Звук, микрофоны, экраны для конференций и форумов",
        items: [
            "Акустическая система JBL",
            "Беспроводные микрофоны Sennheiser",
            "LED-экран или ТВ на стойке",
            "Микшерный пульт",
            "Коммутация",
        ],
        price: "от 35 000 ₽",
    },
    {
        id: "prom",
        name: "Выпускные",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop&q=80",
        description: "Весёлый и яркий звук + свет для выпускных вечеров",
        items: [
            "Акустическая система",
            "Микрофоны",
            "Световое оборудование",
            "Дым-машина",
            "DJ-оборудование",
        ],
        price: "от 30 000 ₽",
    },
    {
        id: "expo",
        name: "Выставки",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop&q=80",
        description: "Оборудование для выставочных стендов и презентаций",
        items: [
            "ТВ-панели на стойках",
            "Акустика для стенда",
            "Микрофоны",
            "LED-экраны",
        ],
        price: "от 20 000 ₽",
    },
    {
        id: "wedding",
        name: "Свадьбы",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&q=80",
        description: "Романтичный звук и свет для вашего торжества",
        items: [
            "Акустическая система",
            "Микрофоны беспроводные",
            "Световое оформление",
            "Спецэффекты (дым, пузыри)",
            "DJ-оборудование",
        ],
        price: "от 40 000 ₽",
    },
    {
        id: "corporate",
        name: "Корпоративы",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop&q=80",
        description: "Корпоративные мероприятия любого масштаба",
        items: [
            "Акустическая система",
            "Микрофоны",
            "Световое оборудование",
            "LED-экран",
            "DJ-оборудование",
            "Звукорежиссёр",
        ],
        price: "от 50 000 ₽",
    },
    {
        id: "birthday",
        name: "Дни рождения",
        image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop&q=80",
        description: "Яркий праздник с качественным звуком",
        items: [
            "Акустическая система",
            "Микрофон беспроводной",
            "Световое оформление",
            "DJ-оборудование",
            "Караоке (опционально)",
        ],
        price: "от 15 000 ₽",
    },
];
