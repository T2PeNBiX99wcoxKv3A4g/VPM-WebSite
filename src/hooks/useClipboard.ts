import {useCallback} from "react";

const fallbackCopy = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
};

export type Notify = (message: string) => void;

/** Copies text and reports the result through the toast callback. */
export const useCopyToClipboard = (notify: Notify) =>
    useCallback(
        async (text: string, successMessage = "Copied to clipboard!") => {
            if (!text) {
                return;
            }

            try {
                if (navigator.clipboard?.writeText) {
                    await navigator.clipboard.writeText(text);
                } else {
                    fallbackCopy(text);
                }
            } catch {
                fallbackCopy(text);
            }

            notify(successMessage);
        },
        [notify]
    );
