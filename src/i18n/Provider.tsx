import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
    defaultLanguage,
    detectLanguage,
    isSupportedLanguage,
    languageStorageKey,
    translate,
} from "../i18n";

interface I18nValue {
    language: string;
    setLanguage: (id: string) => void;
    t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

/** `?lang=ja` wins over the stored preference, so a language can be linked directly. */
const initialLanguage = (): string => {
    const requested = new URLSearchParams(window.location.search).get("lang");

    if (requested && isSupportedLanguage(requested)) {
        return requested;
    }

    const browser = navigator.languages?.length ? navigator.languages : [navigator.language];

    return detectLanguage(localStorage.getItem(languageStorageKey), browser) ?? defaultLanguage;
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<string>(initialLanguage);

    useEffect(() => {
        localStorage.setItem(languageStorageKey, language);
        document.documentElement.lang = language;
    }, [language]);

    const t = useCallback(
        (key: string, vars?: Record<string, string | number>) => translate(language, key, vars),
        [language]
    );

    const value = useMemo<I18nValue>(() => ({ language, setLanguage, t }), [language, t]);

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nValue => {
    const value = useContext(I18nContext);

    if (!value) {
        throw new Error("useI18n must be used inside I18nProvider");
    }

    return value;
};
