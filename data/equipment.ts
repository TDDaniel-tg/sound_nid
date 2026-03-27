export interface EquipmentCategory {
    title: string;
    items: string[];
}

export interface EquipmentTab {
    id: string;
    label: string;
    categories: EquipmentCategory[];
    placeholder?: boolean;
}

export const equipmentTabs: EquipmentTab[] = [
    {
        id: "sound",
        label: "ЗВУК",
        categories: [
            {
                title: "АКУСТИЧЕСКИЕ СИСТЕМЫ",
                items: [
                    "L-Acoustics",
                    "NEXO",
                    "FBT",
                    "JBL",
                    "Turbosound",
                    "HK Audio",
                    "Invotone",
                    "Alto",
                ],
            },
            {
                title: "МИКРОФОНЫ",
                items: [
                    "Shure",
                    "Sennheiser",
                    "DPA",
                    "Electro-Voice",
                    "AKG",
                    "Neumann",
                ],
            },
            {
                title: "МОНИТОРЫ",
                items: [
                    "L-Acoustics",
                    "NEXO",
                    "FBT",
                    "JBL",
                    "Turbosound",
                    "HK Audio",
                    "Invotone",
                    "Alto",
                ],
            },
            {
                title: "МИКШЕРНЫЕ ПУЛЬТЫ ЦИФРОВЫЕ",
                items: [
                    "Yamaha CL/QL5",
                    "Yamaha CL/QL3",
                    "Behringer X32",
                    "Behringer Wing",
                    "Midas M32",
                ],
            },
            {
                title: "МИКШЕРНЫЕ ПУЛЬТЫ АНАЛОГОВЫЕ",
                items: ["Mackie", "Behringer", "Soundcraft", "Yamaha"],
            },
            {
                title: "БЭКЛАЙН — БАРАБАНЫ",
                items: [
                    "Yamaha Tour Custom Maple (BD22, Tom 10/12, FT 16, SN 14) — 4 стойки под тарелки, стойка hi-hat, педаль Iron Cobra, стойка малого барабана, стул, коврик",
                    "Tama Starclassic Performer (BD22, Tom 10/12, FT 16, SN 14) — 4 стойки под тарелки, стойка hi-hat, педаль Iron Cobra, стойка малого барабана, стул, коврик",
                ],
            },
            {
                title: "КЛАВИШНЫЕ",
                items: [
                    "Nord Stage 3 — 88 клавиш",
                    "Roland RD-800 — 88 клавиш",
                ],
            },
            {
                title: "DJ-ОБОРУДОВАНИЕ",
                items: [
                    "Pioneer RX3",
                    "CDJ 3000 + A9",
                    "CDJ 3000 + DJM NXS2",
                    "CDJ 2000NXS2 + DJM 900 NXS2",
                    "CDJ 2000NXS + DJM 900 NXS",
                    "Technics 1210 MK5 + Xone 92 MK2",
                ],
            },
            {
                title: "ДОП. ОБОРУДОВАНИЕ",
                items: [
                    "Интерком: Hollyland Solidcom SE-6S (6 абонентов)",
                    "Рации: Baofeng UV-5R",
                ],
            },
            //{
            //title: "СПЕЦЭФФЕКТЫ",
            //    items: [
            //        "Дым-машина",
            //        "Генератор тумана",
            //        "Генератор снега",
            //        "Конфетти-пушка",
            //        "Генератор мыльных пузырей",
            //        "Сценический вентилятор",
            //    ],
            //},
            {
                title: "ПЕРСОНАЛ",
                items: [
                    "Звукорежиссёры",
                    "Художник по свету",
                    "Видеоинженеры",
                    "DJ",
                ],
            },
        ],
    },
    {
        id: "light",
        label: "СВЕТ",
        categories: [],
        placeholder: true,
    },
    {
        id: "led",
        label: "LED",
        categories: [
            {
                title: "LED-ЭКРАНЫ",
                items: ["2×3 м", "2.5×3.5 м"],
            },
            {
                title: "ТВ НА СТОЙКЕ",
                items: ['55"', '65"', '75"', '86"'],
            },
            {
                title: "КАРАОКЕ",
                items: ["AST-100", "AST-250"],
            },
        ],
    },
    {
        id: "sfx",
        label: "СПЕЦЭФФЕКТЫ",
        categories: [
            {
                title: "ДЫМ И ТУМАН",
                items: [
                    "Дым-машина",
                    "Генератор тумана (хейзер)",
                ],
            },
            {
                title: "ВИЗУАЛЬНЫЕ ЭФФЕКТЫ",
                items: [
                    "Конфетти-пушка",
                    "Генератор мыльных пузырей",
                    "Генератор снега",
                ],
            },
            {
                title: "ПРОЧЕЕ",
                items: [
                    "Сценический вентилятор",
                ],
            },
        ],
    },
];
