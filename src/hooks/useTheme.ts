import {useCallback, useEffect, useState} from "react";

const THEME_STORAGE_KEY = "vpm_theme_preference";

export type ThemeName = "dark" | "light";

const readPreferredTheme = (): ThemeName => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);

    if (stored === "dark" || stored === "light") {
        return stored;
    }

    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

/**
 * Applies the preferred theme before React mounts. Without it the `:root` default
 * (dark) would be painted first, which flashes for users whose system is light.
 */
export const applyInitialTheme = () => {
    document.documentElement.setAttribute("data-theme", readPreferredTheme());
};

export const useTheme = () => {
    const [theme, setTheme] = useState<ThemeName>(readPreferredTheme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const onSystemThemeChange = () => {
            if (!localStorage.getItem(THEME_STORAGE_KEY)) {
                setTheme(readPreferredTheme());
            }
        };

        media.addEventListener("change", onSystemThemeChange);
        return () => media.removeEventListener("change", onSystemThemeChange);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(current => {
            const next: ThemeName = current === "light" ? "dark" : "light";
            localStorage.setItem(THEME_STORAGE_KEY, next);
            return next;
        });
    }, []);

    return {theme, toggleTheme};
};
