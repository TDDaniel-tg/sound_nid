"use client";

import { useState, useEffect } from "react";
import { SiteDataProvider, useSiteData, SiteData } from "@/components/SiteDataContext";
import { Category, CategoryItem } from "@/data/categories";
import { Solution, SolutionPackage } from "@/data/solutions";
import { EquipmentCategory } from "@/data/equipment";
import { DJ } from "@/data/djs";

function AdminContent() {
    const { data, loading, saving, error, setData, saveData, resetToDefaults } = useSiteData();
    const [activeSection, setActiveSection] = useState("contacts");
    const [saved, setSaved] = useState(false);
    const [adminToken, setAdminToken] = useState("");

    // Load admin token from sessionStorage
    useEffect(() => {
        const token = sessionStorage.getItem("admin_api_token") || "";
        setAdminToken(token);
    }, []);

    const handleSave = async () => {
        const success = await saveData(adminToken);
        if (success) {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        }
    };

    const update = (partial: Partial<SiteData>) => {
        setData({ ...data, ...partial });
    };

    const sections = [
        { id: "contacts", label: "Контакты" },
        { id: "texts", label: "Тексты" },
        { id: "solutions", label: "Готовые комплекты" },
        { id: "lightSolutions", label: "Световые компл." },
        { id: "categories", label: "Оборудование (Слайдер)" },
        { id: "equipment", label: "Каталог (Вкладки)" },
        { id: "djs", label: "Диджеи" },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-bg flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-silver">Загрузка данных…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg text-text">
            {/* Header */}
            <div className="bg-surface border-b border-border px-6 py-4 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <h1 className="font-bebas text-2xl tracking-wider">
                        SOUND <span className="text-accent">NID</span> — Админ
                    </h1>
                    <div className="flex gap-3 items-center">
                        {error && (
                            <span className="text-red-400 text-sm max-w-[200px] truncate">
                                {error}
                            </span>
                        )}
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className={`px-6 py-2 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all ${saved
                                    ? "bg-green-700 text-white"
                                    : saving
                                        ? "bg-accent/50 text-white/70 cursor-wait"
                                        : "bg-accent hover:bg-accent-hover text-white"
                                }`}
                        >
                            {saving ? "Сохранение…" : saved ? "✓ Сохранено" : "Сохранить"}
                        </button>
                        <button
                            onClick={() => {
                                if (confirm("Сбросить все данные к значениям по умолчанию?")) {
                                    resetToDefaults();
                                }
                            }}
                            className="px-4 py-2 rounded-lg border border-border text-silver hover:text-white hover:border-accent/50 transition-all text-sm"
                        >
                            Сброс
                        </button>
                        <a
                            href="/"
                            className="px-4 py-2 rounded-lg border border-border text-silver hover:text-white hover:border-accent/50 transition-all text-sm"
                        >
                            На сайт
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8">
                {/* Sidebar */}
                <nav className="w-48 flex-shrink-0 hidden md:block">
                    <div className="sticky top-24 space-y-1">
                        {sections.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setActiveSection(s.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeSection === s.id
                                        ? "bg-accent text-white"
                                        : "text-silver hover:text-white hover:bg-surface"
                                    }`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Mobile tabs */}
                <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-4 border-b border-border fixed top-[65px] left-0 right-0 bg-bg z-40 px-6 pt-4">
                    {sections.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setActiveSection(s.id)}
                            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm transition-all ${activeSection === s.id
                                    ? "bg-accent text-white"
                                    : "bg-surface text-silver"
                                }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {activeSection === "contacts" && (
                        <ContactsEditor data={data} update={update} />
                    )}
                    {activeSection === "texts" && (
                        <TextsEditor data={data} update={update} />
                    )}
                    {activeSection === "solutions" && (
                        <SolutionsEditor data={data} update={update} />
                    )}
                    {activeSection === "lightSolutions" && (
                        <LightSolutionsEditor data={data} update={update} />
                    )}
                    {activeSection === "categories" && (
                        <CategoriesEditor data={data} update={update} />
                    )}
                    {activeSection === "equipment" && (
                        <EquipmentEditor data={data} update={update} />
                    )}
                    {activeSection === "djs" && (
                        <DJsEditor data={data} update={update} />
                    )}
                </div>
            </div>
        </div>
    );
}

/* ==============================
   CONTACTS EDITOR
   ============================== */
function ContactsEditor({
    data,
    update,
}: {
    data: SiteData;
    update: (p: Partial<SiteData>) => void;
}) {
    return (
        <AdminCard title="КОНТАКТЫ">
            <div className="grid md:grid-cols-2 gap-6">
                <Field
                    label="Телефон"
                    value={data.contacts.phone}
                    onChange={(v) =>
                        update({ contacts: { ...data.contacts, phone: v } })
                    }
                />
                <Field
                    label="Telegram"
                    value={data.contacts.telegram}
                    onChange={(v) =>
                        update({ contacts: { ...data.contacts, telegram: v } })
                    }
                />
            </div>
        </AdminCard>
    );
}

/* ==============================
   TEXTS EDITOR
   ============================== */
function TextsEditor({
    data,
    update,
}: {
    data: SiteData;
    update: (p: Partial<SiteData>) => void;
}) {
    const updateText = (key: string, value: string) => {
        update({ texts: { ...data.texts, [key]: value } });
    };

    return (
        <div className="space-y-6">
            <AdminCard title="HERO-СЕКЦИЯ">
                <Field
                    label="Заголовок"
                    value={data.texts.heroTitle}
                    onChange={(v) => updateText("heroTitle", v)}
                />
                <Field
                    label="Подзаголовок"
                    value={data.texts.heroSubtitle}
                    onChange={(v) => updateText("heroSubtitle", v)}
                    className="mt-4"
                />
            </AdminCard>

            <AdminCard title="О КОМПАНИИ">
                <TextArea
                    label="Первый абзац"
                    value={data.texts.aboutText1}
                    onChange={(v) => updateText("aboutText1", v)}
                />
                <TextArea
                    label="Второй абзац"
                    value={data.texts.aboutText2}
                    onChange={(v) => updateText("aboutText2", v)}
                    className="mt-4"
                />
            </AdminCard>

            <AdminCard title="ФУТЕР">
                <TextArea
                    label="Цитата"
                    value={data.texts.footerQuote}
                    onChange={(v) => updateText("footerQuote", v)}
                />
            </AdminCard>
        </div>
    );
}

/* ==============================
   SOLUTIONS EDITOR
   ============================== */
function SolutionsEditor({
    data,
    update,
}: {
    data: SiteData;
    update: (p: Partial<SiteData>) => void;
}) {
    const solutions = data.solutions;

    const updateSolution = (index: number, updated: Partial<Solution>) => {
        const newSolutions = [...solutions];
        newSolutions[index] = { ...newSolutions[index], ...updated };
        update({ solutions: newSolutions });
    };

    const addSolution = () => {
        const id = `sol_${Date.now()}`;
        const newSolution: Solution = {
            id,
            name: "Новая категория комплектов",
            image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop&q=80",
            description: "Описание категории",
            packages: [
                {
                    name: "Новый комплект",
                    price: "0 ₽",
                    items: ["Позиция 1"]
                }
            ],
            items: [],
            price: "",
        };
        update({ solutions: [...solutions, newSolution] });
    };

    const removeSolution = (index: number) => {
        if (confirm(`Удалить "${solutions[index].name}"?`)) {
            update({ solutions: solutions.filter((_, i) => i !== index) });
        }
    };

    const moveSolution = (index: number, dir: -1 | 1) => {
        const newIndex = index + dir;
        if (newIndex < 0 || newIndex >= solutions.length) return;
        const newSolutions = [...solutions];
        [newSolutions[index], newSolutions[newIndex]] = [newSolutions[newIndex], newSolutions[index]];
        update({ solutions: newSolutions });
    };

    const addPackage = (solIndex: number) => {
        const newPkg: SolutionPackage = {
            name: "Новый комплект",
            price: "0 ₽",
            items: ["Позиция 1"],
        };
        const newSolutions = [...solutions];
        newSolutions[solIndex] = {
            ...newSolutions[solIndex],
            packages: [...(newSolutions[solIndex].packages || []), newPkg],
        };
        update({ solutions: newSolutions });
    };

    const updatePackage = (
        solIndex: number,
        pkgIndex: number,
        updated: Partial<SolutionPackage>
    ) => {
        const newSolutions = [...solutions];
        const newPackages = [...(newSolutions[solIndex].packages || [])];
        newPackages[pkgIndex] = { ...newPackages[pkgIndex], ...updated };
        newSolutions[solIndex] = { ...newSolutions[solIndex], packages: newPackages };
        update({ solutions: newSolutions });
    };

    const removePackage = (solIndex: number, pkgIndex: number) => {
        if (!confirm("Удалить этот вложенный комплект?")) return;
        const newSolutions = [...solutions];
        newSolutions[solIndex] = {
            ...newSolutions[solIndex],
            packages: (newSolutions[solIndex].packages || []).filter((_, i) => i !== pkgIndex),
        };
        update({ solutions: newSolutions });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-bebas text-3xl tracking-wider">КОМПЛЕКТЫ</h2>
                <button
                    onClick={addSolution}
                    className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                >
                    + Добавить
                </button>
            </div>

            {solutions.map((sol, i) => (
                <AdminCard
                    key={sol.id}
                    title={sol.name}
                    actions={
                        <div className="flex gap-2">
                            <SmallBtn onClick={() => moveSolution(i, -1)} disabled={i === 0}>↑</SmallBtn>
                            <SmallBtn onClick={() => moveSolution(i, 1)} disabled={i === solutions.length - 1}>↓</SmallBtn>
                            <SmallBtn onClick={() => removeSolution(i)} danger>✕</SmallBtn>
                        </div>
                    }
                >
                    <div className="grid md:grid-cols-2 gap-4">
                        <Field
                            label="Название раздела (напр. Свадьбы)"
                            value={sol.name}
                            onChange={(v) => updateSolution(i, { name: v })}
                        />
                        <Field
                            label="URL фото (обложка)"
                            value={sol.image}
                            onChange={(v) => updateSolution(i, { image: v })}
                        />
                    </div>
                    <TextArea
                        label="Краткое описание"
                        value={sol.description}
                        onChange={(v) => updateSolution(i, { description: v })}
                        className="mt-4"
                    />

                    <div className="mt-8 border-t border-border pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bebas text-xl tracking-wider text-text">Вложенные комплекты ({sol.packages?.length || 0})</h4>
                            <button
                                onClick={() => addPackage(i)}
                                className="text-accent hover:text-accent-hover text-sm font-semibold transition-colors"
                            >
                                + Добавить комплект
                            </button>
                        </div>
                        <div className="space-y-4">
                            {(sol.packages || []).map((pkg, pi) => (
                                <div key={pi} className="bg-bg border border-border rounded-lg p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="font-bebas text-silver text-lg tracking-wider">Комплект #{pi + 1}</span>
                                        <SmallBtn onClick={() => removePackage(i, pi)} danger>✕</SmallBtn>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <Field label="Название комплекта (Малый, Средний)" value={pkg.name} onChange={v => updatePackage(i, pi, { name: v })} small />
                                        <Field label="Цена комплекта" value={pkg.price} onChange={v => updatePackage(i, pi, { price: v })} small />
                                    </div>
                                    <label className="text-silver text-sm mb-2 block">Состав (каждая позиция с новой строки)</label>
                                    <textarea
                                        value={pkg.items.join("\n")}
                                        onChange={(e) => updatePackage(i, pi, { items: e.target.value.split("\n").filter(Boolean) })}
                                        rows={4}
                                        className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text outline-none focus:border-accent transition-colors text-sm font-mono"
                                    />
                                </div>
                            ))}
                            {(!sol.packages || sol.packages.length === 0) && (
                                <p className="text-silver/50 text-sm text-center py-4">Нет вложенных комплектов.</p>
                            )}
                        </div>
                    </div>
                </AdminCard>
            ))}
        </div>
    );
}

/* ==============================
   LIGHT SOLUTIONS EDITOR
   ============================== */
function LightSolutionsEditor({
    data,
    update,
}: {
    data: SiteData;
    update: (p: Partial<SiteData>) => void;
}) {
    const solutions = data.lightSolutions || [];

    const updateSolution = (index: number, updated: Partial<Solution>) => {
        const newSolutions = [...solutions];
        newSolutions[index] = { ...newSolutions[index], ...updated };
        update({ lightSolutions: newSolutions });
    };

    const addSolution = () => {
        const id = `light_sol_${Date.now()}`;
        const newSolution: Solution = {
            id,
            name: "Новый световой комплект",
            image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop&q=80",
            description: "Описание светового комплекта",
            items: ["LED PAR × 4"],
            price: "от 0 ₽",
            packages: [],
        };
        update({ lightSolutions: [...solutions, newSolution] });
    };

    const removeSolution = (index: number) => {
        if (confirm(`Удалить "${solutions[index].name}"?`)) {
            update({ lightSolutions: solutions.filter((_, i) => i !== index) });
        }
    };

    const moveSolution = (index: number, dir: -1 | 1) => {
        const newIndex = index + dir;
        if (newIndex < 0 || newIndex >= solutions.length) return;
        const newSolutions = [...solutions];
        [newSolutions[index], newSolutions[newIndex]] = [newSolutions[newIndex], newSolutions[index]];
        update({ lightSolutions: newSolutions });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-bebas text-3xl tracking-wider">СВЕТОВЫЕ КОМПЛЕКТЫ</h2>
                <button
                    onClick={addSolution}
                    className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                >
                    + Добавить
                </button>
            </div>

            {solutions.map((sol, i) => (
                <AdminCard
                    key={sol.id}
                    title={sol.name}
                    actions={
                        <div className="flex gap-2">
                            <SmallBtn onClick={() => moveSolution(i, -1)} disabled={i === 0}>↑</SmallBtn>
                            <SmallBtn onClick={() => moveSolution(i, 1)} disabled={i === solutions.length - 1}>↓</SmallBtn>
                            <SmallBtn onClick={() => removeSolution(i)} danger>✕</SmallBtn>
                        </div>
                    }
                >
                    <div className="grid md:grid-cols-2 gap-4">
                        <Field
                            label="Название"
                            value={sol.name}
                            onChange={(v) => updateSolution(i, { name: v })}
                        />
                        <Field
                            label="Цена"
                            value={sol.price || ""}
                            onChange={(v) => updateSolution(i, { price: v })}
                        />
                    </div>
                    <Field
                        label="URL фото"
                        value={sol.image}
                        onChange={(v) => updateSolution(i, { image: v })}
                        className="mt-4"
                    />
                    <TextArea
                        label="Описание"
                        value={sol.description}
                        onChange={(v) => updateSolution(i, { description: v })}
                        className="mt-4"
                    />
                    <div className="mt-4">
                        <label className="text-silver text-sm mb-2 block">
                            Состав (каждая позиция с новой строки)
                        </label>
                        <textarea
                            value={(sol.items || []).join("\n")}
                            onChange={(e) =>
                                updateSolution(i, {
                                    items: e.target.value.split("\n").filter(Boolean),
                                })
                            }
                            rows={4}
                            className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-text outline-none focus:border-accent transition-colors text-sm font-mono"
                        />
                    </div>
                </AdminCard>
            ))}
        </div>
    );
}

/* ==============================
   CATEGORIES EDITOR
   ============================== */
function CategoriesEditor({
    data,
    update,
}: {
    data: SiteData;
    update: (p: Partial<SiteData>) => void;
}) {
    const cats = data.categories;

    const updateCategory = (index: number, updated: Partial<Category>) => {
        const newCats = [...cats];
        newCats[index] = { ...newCats[index], ...updated };
        update({ categories: newCats });
    };

    const addCategory = () => {
        const id = `cat_${Date.now()}`;
        const newCat: Category = {
            id,
            name: "Новая категория",
            image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop&q=80",
            items: [],
        };
        update({ categories: [...cats, newCat] });
    };

    const removeCategory = (index: number) => {
        if (confirm(`Удалить "${cats[index].name}"?`)) {
            update({ categories: cats.filter((_, i) => i !== index) });
        }
    };

    const addItem = (catIndex: number) => {
        const newItem: CategoryItem = {
            id: `item_${Date.now()}`,
            name: "Новая позиция",
            description: "Описание",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop&q=80",
        };
        const newCats = [...cats];
        newCats[catIndex] = {
            ...newCats[catIndex],
            items: [...newCats[catIndex].items, newItem],
        };
        update({ categories: newCats });
    };

    const updateItem = (
        catIndex: number,
        itemIndex: number,
        updated: Partial<CategoryItem>
    ) => {
        const newCats = [...cats];
        const newItems = [...newCats[catIndex].items];
        newItems[itemIndex] = { ...newItems[itemIndex], ...updated };
        newCats[catIndex] = { ...newCats[catIndex], items: newItems };
        update({ categories: newCats });
    };

    const removeItem = (catIndex: number, itemIndex: number) => {
        const newCats = [...cats];
        newCats[catIndex] = {
            ...newCats[catIndex],
            items: newCats[catIndex].items.filter((_, i) => i !== itemIndex),
        };
        update({ categories: newCats });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-bebas text-3xl tracking-wider">КАТЕГОРИИ</h2>
                <button
                    onClick={addCategory}
                    className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                >
                    + Добавить
                </button>
            </div>

            {cats.map((cat, ci) => (
                <AdminCard
                    key={cat.id}
                    title={cat.name}
                    actions={
                        <SmallBtn onClick={() => removeCategory(ci)} danger>
                            ✕
                        </SmallBtn>
                    }
                >
                    <div className="grid md:grid-cols-2 gap-4">
                        <Field
                            label="Название"
                            value={cat.name}
                            onChange={(v) => updateCategory(ci, { name: v })}
                        />
                        <Field
                            label="URL фото (обложка)"
                            value={cat.image}
                            onChange={(v) => updateCategory(ci, { image: v })}
                        />
                    </div>

                    {/* Items */}
                    <div className="mt-6 border-t border-border pt-4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-silver text-sm font-medium">
                                Позиции оборудования ({cat.items.length})
                            </span>
                            <button
                                onClick={() => addItem(ci)}
                                className="text-accent hover:text-accent-hover text-sm font-semibold transition-colors"
                            >
                                + Добавить позицию
                            </button>
                        </div>
                        <div className="space-y-3">
                            {cat.items.map((item, ii) => (
                                <div
                                    key={item.id}
                                    className="bg-bg border border-border rounded-lg p-4"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <span className="text-silver text-xs">#{ii + 1}</span>
                                        <SmallBtn onClick={() => removeItem(ci, ii)} danger>
                                            ✕
                                        </SmallBtn>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-3">
                                        <Field
                                            label="Название"
                                            value={item.name}
                                            onChange={(v) => updateItem(ci, ii, { name: v })}
                                            small
                                        />
                                        <Field
                                            label="Описание"
                                            value={item.description}
                                            onChange={(v) =>
                                                updateItem(ci, ii, { description: v })
                                            }
                                            small
                                        />
                                        <Field
                                            label="URL фото"
                                            value={item.image}
                                            onChange={(v) => updateItem(ci, ii, { image: v })}
                                            small
                                        />
                                    </div>
                                </div>
                            ))}
                            {cat.items.length === 0 && (
                                <p className="text-silver/50 text-sm text-center py-4">
                                    Нет позиций. Нажмите «+ Добавить позицию» выше.
                                </p>
                            )}
                        </div>
                    </div>
                </AdminCard>
            ))}
        </div>
    );
}

/* ==============================
   EQUIPMENT EDITOR
   ============================== */
function EquipmentEditor({
    data,
    update,
}: {
    data: SiteData;
    update: (p: Partial<SiteData>) => void;
}) {
    const tabs = data.equipmentTabs;
    const [activeTab, setActiveTab] = useState(tabs[0]?.id || "sound");

    const currentTabIndex = tabs.findIndex((t) => t.id === activeTab);
    const currentTab = tabs[currentTabIndex];

    const updateTab = (tabIndex: number, updated: Partial<{ placeholder: boolean }>) => {
        const newTabs = [...tabs];
        newTabs[tabIndex] = { ...newTabs[tabIndex], ...updated };
        update({ equipmentTabs: newTabs });
    };

    const addCategoryToTab = (tabIndex: number) => {
        const newTabs = [...tabs];
        const newCat: EquipmentCategory = {
            title: "НОВАЯ КАТЕГОРИЯ",
            items: ["Позиция 1"],
        };
        newTabs[tabIndex] = {
            ...newTabs[tabIndex],
            categories: [...newTabs[tabIndex].categories, newCat],
            placeholder: false,
        };
        update({ equipmentTabs: newTabs });
    };

    const updateTabCategory = (
        tabIndex: number,
        catIndex: number,
        updated: Partial<EquipmentCategory>
    ) => {
        const newTabs = [...tabs];
        const newCats = [...newTabs[tabIndex].categories];
        newCats[catIndex] = { ...newCats[catIndex], ...updated };
        newTabs[tabIndex] = { ...newTabs[tabIndex], categories: newCats };
        update({ equipmentTabs: newTabs });
    };

    const removeTabCategory = (tabIndex: number, catIndex: number) => {
        const newTabs = [...tabs];
        newTabs[tabIndex] = {
            ...newTabs[tabIndex],
            categories: newTabs[tabIndex].categories.filter(
                (_, i) => i !== catIndex
            ),
        };
        update({ equipmentTabs: newTabs });
    };

    return (
        <div className="space-y-6">
            <h2 className="font-bebas text-3xl tracking-wider">КАТАЛОГ ОБОРУДОВАНИЯ</h2>

            {/* Tab selector */}
            <div className="flex gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`font-bebas text-lg px-6 py-2 rounded-lg tracking-wider transition-all ${activeTab === tab.id
                                ? "bg-accent text-white"
                                : "bg-surface text-silver hover:text-white border border-border"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {currentTab && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 text-silver text-sm">
                                <input
                                    type="checkbox"
                                    checked={!!currentTab.placeholder}
                                    onChange={(e) =>
                                        updateTab(currentTabIndex, { placeholder: e.target.checked })
                                    }
                                    className="accent-accent"
                                />
                                Заглушка &ldquo;В разработке&rdquo;
                            </label>
                        </div>
                        {!currentTab.placeholder && (
                            <button
                                onClick={() => addCategoryToTab(currentTabIndex)}
                                className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                            >
                                + Добавить раздел
                            </button>
                        )}
                    </div>

                    {!currentTab.placeholder &&
                        currentTab.categories.map((cat, ci) => (
                            <AdminCard
                                key={ci}
                                title={cat.title}
                                actions={
                                    <SmallBtn
                                        onClick={() => removeTabCategory(currentTabIndex, ci)}
                                        danger
                                    >
                                        ✕
                                    </SmallBtn>
                                }
                            >
                                <Field
                                    label="Название раздела"
                                    value={cat.title}
                                    onChange={(v) =>
                                        updateTabCategory(currentTabIndex, ci, { title: v })
                                    }
                                />
                                <div className="mt-4">
                                    <label className="text-silver text-sm mb-2 block">
                                        Позиции (каждая с новой строки)
                                    </label>
                                    <textarea
                                        value={cat.items.join("\n")}
                                        onChange={(e) =>
                                            updateTabCategory(currentTabIndex, ci, {
                                                items: e.target.value.split("\n").filter(Boolean),
                                            })
                                        }
                                        rows={Math.max(3, cat.items.length + 1)}
                                        className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-text outline-none focus:border-accent transition-colors text-sm font-mono"
                                    />
                                </div>
                            </AdminCard>
                        ))}

                    {currentTab.placeholder && (
                        <div className="text-center py-12 border border-border/50 rounded-2xl bg-surface/30">
                            <p className="text-silver/50">
                                Раздел помечен как заглушка. Снимите галочку выше, чтобы добавить содержимое.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ==============================
   DJS EDITOR
   ============================== */
function DJsEditor({
    data,
    update,
}: {
    data: SiteData;
    update: (p: Partial<SiteData>) => void;
}) {
    const djs = data.djs || [];

    const updateDJ = (index: number, updated: Partial<DJ>) => {
        const newDjs = [...djs];
        newDjs[index] = { ...newDjs[index], ...updated };
        update({ djs: newDjs });
    };

    const addDJ = () => {
        const id = `dj_${Date.now()}`;
        const newDj: DJ = {
            id,
            name: "Новый диджей",
            image: "https://images.unsplash.com/photo-1571266028243-3716f02d2d56?w=600&h=800&fit=crop&q=80",
            tags: ["Топ", "House", "Хедлайнер"],
            experience: "Нет опыта",
            description: "Описание диджея",
        };
        update({ djs: [...djs, newDj] });
    };

    const removeDJ = (index: number) => {
        if (confirm(`Удалить диджея "${djs[index].name}"?`)) {
            update({ djs: djs.filter((_, i) => i !== index) });
        }
    };

    const moveDJ = (index: number, dir: -1 | 1) => {
        const newIndex = index + dir;
        if (newIndex < 0 || newIndex >= djs.length) return;
        const newDjs = [...djs];
        [newDjs[index], newDjs[newIndex]] = [newDjs[newIndex], newDjs[index]];
        update({ djs: newDjs });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-bebas text-3xl tracking-wider">ДИДЖЕИ</h2>
                <button
                    onClick={addDJ}
                    className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                >
                    + Добавить
                </button>
            </div>

            {djs.map((dj, i) => (
                <AdminCard
                    key={dj.id}
                    title={dj.name}
                    actions={
                        <div className="flex gap-2">
                            <SmallBtn onClick={() => moveDJ(i, -1)} disabled={i === 0}>↑</SmallBtn>
                            <SmallBtn onClick={() => moveDJ(i, 1)} disabled={i === djs.length - 1}>↓</SmallBtn>
                            <SmallBtn onClick={() => removeDJ(i)} danger>✕</SmallBtn>
                        </div>
                    }
                >
                    <div className="grid md:grid-cols-2 gap-4">
                        <Field
                            label="Имя"
                            value={dj.name}
                            onChange={(v) => updateDJ(i, { name: v })}
                        />
                        <Field
                            label="Теги (через запятую)"
                            value={dj.tags.join(", ")}
                            onChange={(v) =>
                                updateDJ(i, {
                                    tags: v.split(",").map((t) => t.trim()).filter(Boolean),
                                })
                            }
                        />
                    </div>
                    <Field
                        label="URL фото"
                        value={dj.image}
                        onChange={(v) => updateDJ(i, { image: v })}
                        className="mt-4"
                    />
                    <TextArea
                        label="Опыт"
                        value={dj.experience}
                        onChange={(v) => updateDJ(i, { experience: v })}
                        className="mt-4"
                    />
                    <TextArea
                        label="Описание"
                        value={dj.description}
                        onChange={(v) => updateDJ(i, { description: v })}
                        className="mt-4"
                    />
                </AdminCard>
            ))}
        </div>
    );
}

/* ==============================
   SHARED UI COMPONENTS
   ============================== */
function AdminCard({
    title,
    children,
    actions,
}: {
    title: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
}) {
    return (
        <div className="bg-surface border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bebas text-2xl tracking-wider">{title}</h3>
                {actions}
            </div>
            {children}
        </div>
    );
}

function Field({
    label,
    value,
    onChange,
    className = "",
    small,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    className?: string;
    small?: boolean;
}) {
    return (
        <div className={className}>
            <label className={`text-silver mb-1.5 block ${small ? "text-xs" : "text-sm"}`}>
                {label}
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full bg-bg border border-border rounded-lg px-4 text-text outline-none focus:border-accent transition-colors ${small ? "py-2 text-sm" : "py-3"
                    }`}
            />
        </div>
    );
}

function TextArea({
    label,
    value,
    onChange,
    className = "",
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    className?: string;
}) {
    return (
        <div className={className}>
            <label className="text-silver text-sm mb-1.5 block">{label}</label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={3}
                className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-text outline-none focus:border-accent transition-colors"
            />
        </div>
    );
}

function SmallBtn({
    children,
    onClick,
    danger,
    disabled,
}: {
    children: React.ReactNode;
    onClick: () => void;
    danger?: boolean;
    disabled?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-7 h-7 rounded flex items-center justify-center text-xs transition-all disabled:opacity-30 ${danger
                    ? "text-red-400 hover:bg-red-400/10 hover:text-red-300"
                    : "text-silver hover:bg-white/10 hover:text-white"
                }`}
        >
            {children}
        </button>
    );
}

/* ==============================
   LOGIN PAGE
   ============================== */
function LoginPage({ onLogin }: { onLogin: (token: string) => void }) {
    const [password, setPassword] = useState("");
    const [apiToken, setApiToken] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "soundnid2024") {
            sessionStorage.setItem("admin_auth", "true");
            if (apiToken) {
                sessionStorage.setItem("admin_api_token", apiToken);
            }
            onLogin(apiToken);
            setError("");
        } else {
            setError("Неверный пароль");
        }
    };

    return (
        <div className="min-h-screen bg-bg flex items-center justify-center px-6">
            <div className="w-full max-w-sm">
                <h1 className="font-bebas text-4xl text-text text-center tracking-wider mb-2">
                    SOUND <span className="text-accent">NID</span>
                </h1>
                <h2 className="font-bebas text-xl text-silver text-center tracking-wider mb-8">
                    ADMIN PANEL
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-silver text-sm mb-1.5 block">Пароль</label>
                        <input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text outline-none focus:border-accent transition-colors"
                        />
                    </div>
                    <div>
                        <label className="text-silver text-sm mb-1.5 block">
                            API Token <span className="text-silver/50">(для сохранения в БД)</span>
                        </label>
                        <input
                            type="password"
                            placeholder="ADMIN_API_TOKEN из .env"
                            value={apiToken}
                            onChange={(e) => setApiToken(e.target.value)}
                            className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text outline-none focus:border-accent transition-colors"
                        />
                    </div>
                    {error && <p className="text-accent text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded-lg font-semibold uppercase tracking-wider transition-all"
                    >
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
}

/* ==============================
   MAIN ADMIN PAGE
   ============================== */
export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const auth = sessionStorage.getItem("admin_auth");
        if (auth === "true") setIsLoggedIn(true);
    }, []);

    if (!mounted) return <div className="min-h-screen bg-bg" />;

    if (!isLoggedIn) {
        return (
            <LoginPage
                onLogin={() => setIsLoggedIn(true)}
            />
        );
    }

    return (
        <SiteDataProvider>
            <AdminContent />
        </SiteDataProvider>
    );
}
