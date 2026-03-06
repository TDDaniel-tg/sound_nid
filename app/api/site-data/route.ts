import { NextResponse } from "next/server";
import { getSupabaseClient, getSupabaseAdmin } from "@/lib/supabase";
import { categories as defaultCategories } from "@/data/categories";
import { solutions as defaultSolutions } from "@/data/solutions";
import { equipmentTabs as defaultEquipmentTabs } from "@/data/equipment";

const defaultContacts = {
    phone: "+7 (000) 000-00-00",
    telegram: "@soundnid",
};

const defaultTexts = {
    heroTitle: "ЗВУК И СВЕТ ДЛЯ ВАШЕГО МЕРОПРИЯТИЯ",
    heroSubtitle: "Аренда профессионального оборудования в Москве",
    aboutText1:
        "Sound NID — основана в 2018 году. Начиналась как небольшая инициатива, посвящённая качественному звуку. Сегодня это команда профессионалов, объединённых общей целью — обеспечить события клиентов безупречным звучанием.",
    aboutText2:
        "За годы работы мы выросли из одного энтузиаста в сплочённую команду, оснащённую современным парком звукового и светового оборудования. Надёжность, доступность и внимание к деталям — то, за что нас выбирают снова.",
    footerQuote:
        "Мы гордимся тем, что каждый клиент получает индивидуальный подход. Сотрудничайте с нами — качество звука и света действительно имеет значение.",
};

function getDefaults() {
    return {
        contacts: defaultContacts,
        texts: defaultTexts,
        categories: defaultCategories,
        solutions: defaultSolutions,
        equipment_tabs: defaultEquipmentTabs,
    };
}

// GET /api/site-data — fetch site data
export async function GET() {
    const supabase = getSupabaseClient();

    if (!supabase) {
        // Supabase not configured — return defaults
        const d = getDefaults();
        return NextResponse.json({
            contacts: d.contacts,
            texts: d.texts,
            categories: d.categories,
            solutions: d.solutions,
            equipmentTabs: d.equipment_tabs,
        });
    }

    const { data, error } = await supabase
        .from("site_data")
        .select("*")
        .eq("id", "main")
        .single();

    if (error || !data) {
        // No data in DB yet — return defaults
        const d = getDefaults();
        return NextResponse.json({
            contacts: d.contacts,
            texts: d.texts,
            categories: d.categories,
            solutions: d.solutions,
            equipmentTabs: d.equipment_tabs,
        });
    }

    return NextResponse.json({
        contacts: data.contacts || defaultContacts,
        texts: data.texts || defaultTexts,
        categories: data.categories || defaultCategories,
        solutions: data.solutions || defaultSolutions,
        equipmentTabs: data.equipment_tabs || defaultEquipmentTabs,
    });
}

// PUT /api/site-data — update site data (requires ADMIN_API_TOKEN)
export async function PUT(request: Request) {
    // Auth check
    const authHeader = request.headers.get("authorization");
    const token = process.env.ADMIN_API_TOKEN;

    if (!token || authHeader !== `Bearer ${token}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    if (!supabase) {
        return NextResponse.json(
            { error: "Supabase not configured" },
            { status: 500 }
        );
    }

    const body = await request.json();

    const { error } = await supabase.from("site_data").upsert({
        id: "main",
        contacts: body.contacts,
        texts: body.texts,
        categories: body.categories,
        solutions: body.solutions,
        equipment_tabs: body.equipmentTabs,
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
