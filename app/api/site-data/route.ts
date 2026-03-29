import { NextResponse } from "next/server";
import { getSupabaseClient, getSupabaseAdmin } from "@/lib/supabase";
import { categories as defaultCategories } from "@/data/categories";
import { solutions as defaultSolutions } from "@/data/solutions";
import { equipmentTabs as defaultEquipmentTabs } from "@/data/equipment";
import { djs as defaultDjs } from "@/data/djs";
import { lightSolutions as defaultLightSolutions } from "@/data/lightSolutions";
import { soundSolutions as defaultSoundSolutions } from "@/data/soundSolutions";

const defaultContacts = {
  phone: "+79685904652",
  telegram: "@soundnid",
};

const defaultTexts = {
  heroTitle: "ЗВУК И СВЕТ ДЛЯ ВАШЕГО МЕРОПРИЯТИЯ",
  heroSubtitle: "Аренда профессионального оборудования в Москве и МО",
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
    light_solutions: defaultLightSolutions,
    sound_solutions: defaultSoundSolutions,
    equipment_tabs: defaultEquipmentTabs,
    djs: defaultDjs,
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
      lightSolutions: d.light_solutions,
      soundSolutions: d.sound_solutions,
      equipmentTabs: d.equipment_tabs,
      djs: d.djs,
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
      lightSolutions: d.light_solutions,
      soundSolutions: d.sound_solutions,
      equipmentTabs: d.equipment_tabs,
      djs: d.djs,
    });
  }

  return NextResponse.json({
    contacts: data.contacts || defaultContacts,
    texts: data.texts || defaultTexts,
    categories: data.categories || defaultCategories,
    solutions: data.solutions || defaultSolutions,
    lightSolutions: data.light_solutions || defaultLightSolutions,
    soundSolutions: data.sound_solutions || defaultSoundSolutions,
    equipmentTabs: data.equipment_tabs || defaultEquipmentTabs,
    djs: data.djs || defaultDjs,
  });
}

// PUT /api/site-data — update site data (requires ADMIN_API_TOKEN)
export async function PUT(request: Request) {
  // Auth check
  const authHeader = request.headers.get("authorization");
  const token = process.env.ADMIN_API_TOKEN;

  // Temporarily bypass token check so we can seed initial data easily, 
  // actually wait, no, the user has the token in .env.local, so it's fine.
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
    light_solutions: body.lightSolutions,
    equipment_tabs: body.equipmentTabs,
    djs: body.djs,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
