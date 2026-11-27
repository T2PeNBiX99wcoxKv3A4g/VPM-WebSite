import en from "./i18n/en.json";
import ja from "./i18n/ja.json";
import zhCN from "./i18n/zh-CN.json";
import zhTW from "./i18n/zh-TW.json";

/** One dictionary per language; every key falls back to English. */
const copy: Record<string, Record<string, string>> = {
    en,
    ja,
    "zh-CN": zhCN,
    "zh-TW": zhTW,
};

export type Language = { id: string; label: string };

export const languages: Language[] = [
    { id: "en", label: "English" },
    { id: "ja", label: "日本語" },
    { id: "zh-CN", label: "简体中文" },
    { id: "zh-TW", label: "繁體中文" },
];

export const defaultLanguage = "en";

export const languageStorageKey = "vpm-listing-language";

/** Text for the given language, falling back to English per key. `{name}` placeholders are filled in. */
export function translate(language: string, key: string, vars?: Record<string, string | number>): string {
    let text = copy[language]?.[key] ?? copy[defaultLanguage][key] ?? key;

    for (const [name, value] of Object.entries(vars ?? {})) {
        text = text.replaceAll(`{${name}}`, String(value));
    }

    return text;
}

export const isSupportedLanguage = (id: string): boolean => languages.some(language => language.id === id);

/**
 * Picks the language from the stored preference, then from the browser's preferences.
 * The `zh` regions that read traditional Chinese map to `zh-TW`, everything else
 * falls back to English.
 */
export function detectLanguage(stored: string | null, browser: readonly string[]): string {
    const available = languages.map(language => language.id);

    if (stored && available.includes(stored)) {
        return stored;
    }

    for (const tag of browser) {
        const exact = available.find(id => id.toLowerCase() === tag.toLowerCase());

        if (exact) {
            return exact;
        }

        if (/^zh-(hant|tw|hk|mo)/i.test(tag)) {
            return "zh-TW";
        }

        const base = tag.split("-")[0].toLowerCase();
        const bare = available.find(id => id.toLowerCase() === base);

        if (bare) {
            return bare;
        }
    }

    return defaultLanguage;
}
