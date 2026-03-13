export interface DJ {
  id: string;
  name: string;
  image: string;
  tags: string[];
  description: string;
  experience: string;
}

export const djs: DJ[] = [
  {
    id: "volin",
    name: "Максим / Dj VOLIN",
    image: "/telegram_assets/volin.jpg",
    tags: ["Свадьбы", "Корпоративы", "Дни рождения"],
    experience: "Резидент: Вокруг света, Алоха бар, Нах бар, Киски бар",
    description: "Работаю на частных мероприятиях любых форматов. Создам правильное настроение для вашей вечеринки.",
  },
  {
    id: "panfilov",
    name: "Егор Панфилов",
    image: "/telegram_assets/panfilov.jpg",
    tags: ["Топ-20", "Хедлайнер", "Event-проекты"],
    experience: "Топ 20 лучших диджеев РФ (TOP 100, Wedding awards). Резидент Big.Bro.Pro, Танцы, Вокруг Света, Stereo People",
    description: "Регулярно приглашают в качестве хедлайнера на крупные мероприятия и значимые event-проекты.",
  },
  {
    id: "narek",
    name: "Нарек Меликян",
    image: "/telegram_assets/narek.jpg",
    tags: ["Премиум", "Корпоративы", "VIP"],
    experience: "Яндекс, Сбербанк, VK, MTC",
    description: "Самый русский армянин event-диджеинга с итальянской внешностью, безупречным вкусом и харизмой. Моя аудитория — люди из мира политики и бизнеса.",
  },
  {
    id: "triseven",
    name: "Диджей TRISEVEN",
    image: "/telegram_assets/triseven.jpg",
    tags: ["Pop", "House", "Хиты"],
    experience: "Papa's bar, Мишки бар, Шашлыкофф. Опыт 7-8 лет.",
    description: "Стиль: Russian pop, 80/90/2000-е, Club House, disco, deep, afro. Работал с сетью «Глобус».",
  },
  {
    id: "sashajues",
    name: "SASHA JUES",
    image: "/telegram_assets/sashajues.jpg",
    tags: ["Артист", "Шоумен", "Муз-директор"],
    experience: "Мята Платинум, ROOF LOUNGE, SIBIR, Газпром, МТС",
    description: "Любимые направления: Afro House, Tech House, Bass House, Indie Dance. Основатель Event-агентства POSTSCRIPTUM. Выступающий спортсмен.",
  },
  {
    id: "prokopovich",
    name: "DJ PROKOPOVICH",
    image: "/telegram_assets/prokopovich.jpg",
    tags: ["Атмосфера", "Масштаб", "Драйв"],
    experience: "WB, VK, Т-банк, МТС",
    description: "Это решение. Если нужен не просто диджей, а атмосфера, то ко мне! Сделаю ваш день незабываемым.",
  },
  {
    id: "andrey26",
    name: "Андрей",
    image: "/telegram_assets/andrey.jpg",
    tags: ["Tech House", "Bass House", "Afro House"],
    experience: "Депо, 16 Тонн, Davno bar, Росатом, ЛДПР",
    description: "Финалист 6 сезона лиги диджеев. Более 220 мероприятий за 2 года. Поп-музыка от 90х до современных хитов, смотрю по ситуации и реакции гостей.",
  },
  {
    id: "maksim",
    name: "Максим Чумичев",
    image: "/telegram_assets/maksim.jpg",
    tags: ["Опыт 8+ лет", "Спорт. турниры", "Москва"],
    experience: "Согласие HALL, Остров Мечты, Лужники, ДЕПО, Метрополис, Европолис, Сытый лось, МЯТА Платинум",
    description: "Более 8 лет стажа. Опыт работы на крупных концертных площадках, спортивных соревнованиях, фуд-моллах, торговых центрах и в топовых ресторанах Москвы.",
  },
  {
    id: "polden",
    name: "Иван Полден",
    image: "/telegram_assets/polden.jpg",
    tags: ["Резидент", "Атмосфера", "Клубы"],
    experience: "LASKI CLUB РОДЧЕЛЬСКАЯ, ВОКРУГ СВЕТА НИКОЛЬСКАЯ, ЗЕЛЕНАЯ СОБАКА КУЗНЕЦКИЙ, SUMMER PUNCH, HOOKAH PLACE, VASILCHUKI",
    description: "Не просто ставлю музыку! Важнее чувствовать настроение гостей и вести их за собой, создавая идеальную атмосферу!",
  },
  {
    id: "honasty",
    name: "Максим / HØNASTY",
    image: "/telegram_assets/honasty.jpg",
    tags: ["Fashion", "Резидент", "Корпоративы"],
    experience: "354 Restaurant Group, Laski Night Club, Siyanie, Birds, Community Russia, Treff8",
    description: "Основатель музыкального фешн-проекта KVAZAR, резидент 354 Restaurant Group. Опыт 3 года. Работал с Альфа банком, Яндексом, SANY, Газпром.",
  },
  {
    id: "malahov",
    name: "Даня Малахов",
    image: "/telegram_assets/malahov.JPG",
    tags: ["Английский", "Газпром", "VK FEST"],
    experience: "VK FEST, Москва Фестиваль Географии, Газпром, все банки РФ. Опыт работы за рубежом.",
    description: "Диджей компании Газпром. Регулярно выступаю на частных (VK FEST, ТОП банки РФ) и государственных мероприятиях. Свободно владею английским.",
  },
];
