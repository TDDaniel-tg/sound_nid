"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode,
} from "react";
import {
    categories as defaultCategories,
    Category,
} from "@/data/categories";
import {
    solutions as defaultSolutions,
    Solution,
} from "@/data/solutions";
import {
    equipmentTabs as defaultEquipmentTabs,
    EquipmentTab,
} from "@/data/equipment";

export interface SiteContacts {
    phone: string;
    telegram: string;
}

export interface SiteTexts {
    heroTitle: string;
    heroSubtitle: string;
    aboutText1: string;
    aboutText2: string;
    footerQuote: string;
}

export interface SiteData {
    contacts: SiteContacts;
    texts: SiteTexts;
    categories: Category[];
    solutions: Solution[];
    equipmentTabs: EquipmentTab[];
}

const defaultTexts: SiteTexts = {
    heroTitle: "ЗВУК И СВЕТ ДЛЯ ВАШЕГО МЕРОПРИЯТИЯ",
    heroSubtitle: "Аренда профессионального оборудования в Москве",
    aboutText1:
        "Sound NID — основана в 2018 году. Начиналась как небольшая инициатива, посвящённая качественному звуку. Сегодня это команда профессионалов, объединённых общей целью — обеспечить события клиентов безупречным звучанием.",
    aboutText2:
        "За годы работы мы выросли из одного энтузиаста в сплочённую команду, оснащённую современным парком звукового и светового оборудования. Надёжность, доступность и внимание к деталям — то, за что нас выбирают снова.",
    footerQuote:
        "Мы гордимся тем, что каждый клиент получает индивидуальный подход. Сотрудничайте с нами — качество звука и света действительно имеет значение.",
};

const defaultContacts: SiteContacts = {
    phone: "+7 (000) 000-00-00",
    telegram: "@soundnid",
};

function getDefaults(): SiteData {
    return {
        contacts: defaultContacts,
        texts: defaultTexts,
        categories: defaultCategories,
        solutions: defaultSolutions,
        equipmentTabs: defaultEquipmentTabs,
    };
}

interface SiteDataContextType {
    data: SiteData;
    loading: boolean;
    saving: boolean;
    error: string | null;
    setData: (newData: SiteData) => void;
    saveData: (adminToken: string) => Promise<boolean>;
    refreshData: () => Promise<void>;
    resetToDefaults: () => void;
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<SiteData>(getDefaults);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refreshData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch("/api/site-data");
            if (res.ok) {
                const json = await res.json();
                setData(json);
            } else {
                // API failed — use defaults
                setData(getDefaults());
            }
        } catch {
            // Network error — use defaults
            setData(getDefaults());
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshData();
    }, [refreshData]);

    const saveData = async (adminToken: string): Promise<boolean> => {
        try {
            setSaving(true);
            setError(null);
            const res = await fetch("/api/site-data", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${adminToken}`,
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const json = await res.json();
                setError(json.error || "Ошибка сохранения");
                return false;
            }

            return true;
        } catch {
            setError("Ошибка сети при сохранении");
            return false;
        } finally {
            setSaving(false);
        }
    };

    const resetToDefaults = () => {
        setData(getDefaults());
    };

    return (
        <SiteDataContext.Provider
            value={{
                data,
                loading,
                saving,
                error,
                setData,
                saveData,
                refreshData,
                resetToDefaults,
            }}
        >
            {children}
        </SiteDataContext.Provider>
    );
}

export function useSiteData() {
    const ctx = useContext(SiteDataContext);
    if (!ctx) {
        throw new Error("useSiteData must be used within SiteDataProvider");
    }
    return ctx;
}
