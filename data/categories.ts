export interface CategoryItem {
    id: string;
    name: string;
    description: string;
    image: string;
}

export interface Category {
    id: string;
    name: string;
    image: string;
    items: CategoryItem[];
}

export const categories: Category[] = [
    {
        id: "sound",
        name: "Звуковое оборудование",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop&q=80",
        items: [
            { id: "s1", name: "L-Acoustics A15", description: "Линейный массив премиум-класса", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop&q=80" },
            { id: "s2", name: "NEXO STM M28", description: "Модульная система звукоусиления", image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=400&h=300&fit=crop&q=80" },
            { id: "s3", name: "JBL VTX A12", description: "Компактный линейный массив", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=300&fit=crop&q=80" },
            { id: "s4", name: "Yamaha CL5", description: "Цифровой микшерный пульт", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop&q=80" },
            { id: "s5", name: "Shure ULXD4Q", description: "Четырёхканальный приёмник", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=300&fit=crop&q=80" },
        ],
    },
    {
        id: "light",
        name: "Световое оборудование",
        image: "https://images.unsplash.com/photo-1504509546545-e000b4a62425?w=600&h=400&fit=crop&q=80",
        items: [
            { id: "l1", name: "Moving Head Wash", description: "Заливающий свет с подвижной головой", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=300&fit=crop&q=80" },
            { id: "l2", name: "LED PAR", description: "LED-прожекторы для заливки", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop&q=80" },
            { id: "l3", name: "Follow Spot", description: "Следящий прожектор", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop&q=80" },
            { id: "l4", name: "LED Bar", description: "Световые LED-бары", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop&q=80" },
        ],
    },
    {
        id: "sfx",
        name: "Спецэффекты",
        image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&h=400&fit=crop&q=80",
        items: [
            { id: "fx1", name: "Дым-машина", description: "Генератор сценического дыма", image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=400&h=300&fit=crop&q=80" },
            { id: "fx2", name: "Генератор тумана", description: "Создание атмосферного тумана", image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=300&fit=crop&q=80" },
            { id: "fx3", name: "Конфетти-пушка", description: "Пушка для конфетти и серпантина", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop&q=80" },
            { id: "fx4", name: "Генератор мыльных пузырей", description: "Для шоу-программ", image: "https://images.unsplash.com/photo-1509457344848-78370309590b?w=400&h=300&fit=crop&q=80" },
        ],
    },
    {
        id: "led",
        name: "LED-экраны",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop&q=80",
        items: [
            { id: "led1", name: "LED-экран 2×3 м", description: "Шаг пикселя P2.6, indoor", image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=400&h=300&fit=crop&q=80" },
            { id: "led2", name: "LED-экран 2.5×3.5 м", description: "Шаг пикселя P3.9, универсальный", image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=400&h=300&fit=crop&q=80" },
        ],
    },
    {
        id: "plasma",
        name: "Плазменные панели",
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=400&fit=crop&q=80",
        items: [
            { id: "p1", name: "ТВ 55\" на стойке", description: "55\" панель с мобильной стойкой", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop&q=80" },
            { id: "p2", name: "ТВ 65\" на стойке", description: "65\" панель с мобильной стойкой", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop&q=80" },
            { id: "p3", name: "ТВ 75\" на стойке", description: "75\" панель с мобильной стойкой", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop&q=80" },
        ],
    },
    {
        id: "backline",
        name: "Бэклайн",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop&q=80",
        items: [
            { id: "b1", name: "Yamaha Tour Custom Maple", description: "BD22, Tom 10/12, FT 16, SN 14 + фурнитура", image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&h=300&fit=crop&q=80" },
            { id: "b2", name: "Nord Stage 3", description: "Клавишные, 88 клавиш", image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=300&fit=crop&q=80" },
            { id: "b3", name: "Roland RD-800", description: "Клавишные, 88 клавиш", image: "https://images.unsplash.com/photo-1552422535-c45813c61732?w=400&h=300&fit=crop&q=80" },
        ],
    },
    {
        id: "dj",
        name: "Диджеи",
        image: "https://images.unsplash.com/photo-1571266028243-3716f02d2d56?w=600&h=400&fit=crop&q=80",
        items: [
            { id: "dj1", name: "Pioneer RX3", description: "Автономный DJ-контроллер", image: "https://images.unsplash.com/photo-1571266028243-3716f02d2d56?w=400&h=300&fit=crop&q=80" },
            { id: "dj2", name: "CDJ 3000 + A9", description: "Топовый клубный сетап", image: "https://images.unsplash.com/photo-1583795484071-3c453e3a7c71?w=400&h=300&fit=crop&q=80" },
            { id: "dj3", name: "CDJ 3000 + DJM NXS2", description: "Профессиональный сетап", image: "https://images.unsplash.com/photo-1583795484071-3c453e3a7c71?w=400&h=300&fit=crop&q=80" },
        ],
    },
];
