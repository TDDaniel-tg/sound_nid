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
        id: "wedding_small",
        name: "Свадьба / Корпоратив / ДР — Малый комплект",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&q=80",
        description: "Идеально для небольших частных мероприятий",
        items: [
            "JBL eon 715 (2 шт)",
            "Mackie mix12fx",
            "Радиомикрофоны Axelvox ds7000ht (2 шт)",
            "Световая стойка + 4 прибора Led Par",
            "Доставка и монтаж внутри МКАД",
        ],
        price: "по запросу",
    },
    {
        id: "wedding_medium",
        name: "Свадьба / Корпоратив / ДР — Средний комплект",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop&q=80",
        description: "Мощный звук и плотный свет для средних площадок",
        items: [
            "FBT X-pro 115 (2 шт)",
            "FBT X-sub 118 (2 шт)",
            "Mackie Pro10fx",
            "Радиосистема Shure BLX PG58",
            'ТВ 55" на стойке + HDMI 20м',
            "2 Тотема + 4 вращающихся головы (wash/beam)",
            "Доставка внутри МКАД, монтаж/демонтаж, настройка света",
        ],
        price: "по запросу",
    },
    {
        id: "wedding_large",
        name: "Свадьба / Корпоратив / ДР — Большой комплект",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop&q=80",
        description: "Масштабное звучание и профессиональный свет для крупных залов",
        items: [
            "FBT X-pro 115 (2 шт)",
            "FBT X-sub 118 (2 шт)",
            "JBL eon 715 (2 шт)",
            "Mackie Pro10fx",
            "Радиосистема Shure BLX PG58",
            "4 Тотема + 8 вращающихся голов (wash/beam)",
            "Доставка внутри МКАД, монтаж/демонтаж, настройка света",
        ],
        price: "по запросу",
    },
    {
        id: "wedding_xlarge",
        name: "Свадьба / Корпоратив / ДР — Большой + комплект",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop&q=80",
        description: "Максимальный набор для грандиозного праздника",
        items: [
            "FBT X-pro 115 (2 шт)",
            "FBT X-sub 118 (2 шт)",
            "JBL eon 715 (2 шт)",
            "Mackie Pro10fx",
            "Радиосистема Shure BLX PG58",
            "4 Тотема + 8 вращающихся голов (wash/beam)",
            "LED Bar (8 шт)",
            "Доставка внутри МКАД, монтаж/демонтаж, настройка света",
        ],
        price: "по запросу",
    },
    {
        id: "conf_small",
        name: "Бизнес конференции — Малый",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&q=80",
        description: "Компактное решение для презентаций и тренингов",
        items: [
            "Invotone DVA2000 (2 шт)",
            "Mackie Pro10fx",
            "Радиосистема Shure BLX PG58",
            "Радиомикрофоны Axelvox ds7000ht (2 шт)",
            "Доставка и монтаж внутри МКАД",
        ],
        price: "по запросу",
    },
    {
        id: "conf_medium",
        name: "Бизнес конференции — Средний",
        image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop&q=80",
        description: "Отличный вариант для форумов с визуальным сопровождением",
        items: [
            "FBT X-pro 115 (2 шт)",
            "FBT X-sub 118 (2 шт)",
            "Mackie Pro10fx",
            "Радиосистема Shure BLX PG58",
            "Головной микрофон Shure QLXD (4 шт)",
            "Сплиттер",
            'ТВ 55" на стойке + HDMI 20м',
            "2 Тотема + 4 вращающихся головы (wash/beam)",
            "Доставка внутри МКАД, монтаж/демонтаж, настройка света",
        ],
        price: "по запросу",
    },
    {
        id: "conf_large",
        name: "Бизнес конференции — Большой",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop&q=80",
        description: "Премиальный сет для масштабных деловых событий",
        items: [
            "FBT X-pro 115 (2 шт)",
            "FBT X-sub 118 (2 шт)",
            "JBL eon 715 (2 шт)",
            "Цифровой микшер Behringer Wing Rack + планшет",
            "Радиосистема Shure BLX PG58",
            "Головной микрофон Shure QLXD (4 шт)",
            "Сплиттер",
            "4 Тотема + 8 вращающихся голов (wash/beam)",
            'ТВ 65" на стойке (2 шт)',
            "Доставка внутри МКАД, монтаж/демонтаж, настройка света",
        ],
        price: "по запросу",
    },
];
