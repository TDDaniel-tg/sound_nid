export interface SolutionPackage {
    name: string;
    items: string[];
    price: string;
    equipmentImage?: string;
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
        equipmentImage: "/telegram_assets/equipment_set.png",
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
        equipmentImage: "/telegram_assets/equipment_set_medium.png",
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
        equipmentImage: "/telegram_assets/equipment_set_large.png",
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
        equipmentImage: "/telegram_assets/equipment_set_xlarge.jpg",
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
        equipmentImage: "/telegram_assets/biz_set_small.png",
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
        equipmentImage: "/telegram_assets/biz_set_medium.png",
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
        equipmentImage: "/telegram_assets/logo.jpg",
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
        image: "/telegram_assets/svadb_video.mp4",
        description: "Подборки оборудования для идеального свадебного торжества.",
        packages: weddingPackages,
    },
    {
        id: "corporate",
        name: "Корпоративы",
        image: "/telegram_assets/korporativ.jpg",
        description: "Готовые сеты для корпоративных мероприятий любого масштаба.",
        packages: weddingPackages,
    },
    {
        id: "conference",
        name: "Бизнес-конференции",
        image: "/telegram_assets/biz_konf.jpg",
        description: "Звук, радиомикрофоны и экраны для деловых событий.",
        packages: confPackages,
    },
    {
        id: "kids",
        name: "Детские праздники",
        image: "/telegram_assets/detskie_video.mp4",
        description: "Веселые и громкие решения для дней рождения и утренников.",
        packages: weddingPackages,
    }
];
