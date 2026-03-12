export interface SolutionPackage {
    name: string;
    items: string[];
    price: string;
}

export interface Solution {
    id: string;
    name: string;
    image: string;
    description: string;
    packages: SolutionPackage[];
    // Legacy fields to prevent immediate breaks
    items?: string[];
    price?: string;
}

const weddingPackages: SolutionPackage[] = [
    {
        name: "Малый комплект",
        price: "0 ₽",
        items: [
            "JBL eon 715 (2 шт)",
            "Mackie mix12fx",
            "Радиомикрофоны Axelvox ds7000ht (2 шт)",
            "Световая стойка + 4 прибора Led Par",
            "(доставка и монтаж внутри МКАД)",
        ]
    },
    {
        name: "Средний комплект",
        price: "0 ₽",
        items: [
            "FBT X-pro 115 (2 шт)",
            "FBT X-sub 118 (2 шт)",
            "Mackie Pro10fx",
            "Радиосистема Shure BLX PG58",
            "ТВ 55' на стойке + hdmi 20м",
            "2 Тотема + 4 вращающихся головы (wash/beam)",
            "«в цену входит доставка внутри мкад, монтаж/демонтаж, настройка света под задачи»",
        ]
    },
    {
        name: "Большой комплект",
        price: "0 ₽",
        items: [
            "FBT X-pro 115 (2 шт)",
            "FBT X-sub 118 (2 шт)",
            "JBL eon 715 (2 шт)",
            "Mackie Pro10fx",
            "Радиосистема Shure BLX PG58",
            "4 Тотема + 8 вращающихся голов (wash/beam)",
            "«в цену входит доставка внутри мкад, монтаж/демонтаж, настройка света под задачи»",
        ]
    },
    {
        name: "Большой + комплект",
        price: "0 ₽",
        items: [
            "FBT X-pro 115 (2 шт)",
            "FBT X-sub 118 (2 шт)",
            "JBL eon 715 (2 шт)",
            "Mackie Pro10fx",
            "Радиосистема Shure BLX PG58",
            "4 Тотема + 8 вращающихся голов (wash/beam)",
            "LED Bar (8 шт)",
            "«в цену входит доставка внутри мкад, монтаж/демонтаж, настройка света под задачи»",
        ]
    }
];

const confPackages: SolutionPackage[] = [
    {
        name: "Малый",
        price: "0 ₽",
        items: [
            "Invotone DVA2000 (2 шт)",
            "Mackie Pro10fx",
            "Радиосистема Shure BLX PG58",
            "Радиомикрофоны Axelvox ds7000ht (2 шт)",
            "(доставка и монтаж внутри МКАД)",
        ]
    },
    {
        name: "Средний",
        price: "0 ₽",
        items: [
            "FBT X-pro 115 (2 шт)",
            "FBT X-sub 118 (2 шт)",
            "Mackie Pro10fx",
            "Радиосистема Shure BLX PG58",
            "Головной микрофон shure qlxd (4 шт)",
            "Сплиттер",
            "ТВ 55' на стойке + hdmi 20м",
            "2 Тотема + 4 вращающихся головы (wash/beam)",
            "«в цену входит доставка внутри мкад, монтаж/демонтаж, настройка света под задачи»",
        ]
    },
    {
        name: "Большой",
        price: "0 ₽",
        items: [
            "FBT X-pro 115 (2 шт)",
            "FBT X-sub 118 (2 шт)",
            "JBL eon 715 (2 шт)",
            "Wing rack + планшет",
            "Радиосистема Shure BLX PG58",
            "Головной микрофон shure qlxd (4 шт)",
            "Сплиттер",
            "4 Тотема + 8 вращающихся голов (wash/beam)",
            "ТВ 65' на стойке (2 шт)",
            "«в цену входит доставка внутри мкад, монтаж/демонтаж, настройка света под задачи»",
        ]
    }
];

export const solutions: Solution[] = [
    {
        id: "wedding",
        name: "Свадьбы",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&q=80",
        description: "Подборки оборудования для идеального свадебного торжества.",
        packages: weddingPackages,
    },
    {
        id: "corporate",
        name: "Корпоративы",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop&q=80",
        description: "Готовые сеты для корпоративных мероприятий любого масштаба.",
        packages: weddingPackages,
    },
    {
        id: "conference",
        name: "Бизнес-конференции",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&q=80",
        description: "Звук, радиомикрофоны и экраны для деловых событий.",
        packages: confPackages,
    },
    {
        id: "kids",
        name: "Детские праздники",
        image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop&q=80",
        description: "Веселые и громкие решения для дней рождения и утренников.",
        packages: weddingPackages,
    }
];
