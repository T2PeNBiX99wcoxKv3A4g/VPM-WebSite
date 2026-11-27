import { Fragment, type ReactNode } from "react";
import { useI18n } from "./Provider";

interface RichTextProps {
    /** Message key; `{name}` placeholders are replaced by the entries in `slots`. */
    message: string;
    slots?: Record<string, ReactNode>;
    vars?: Record<string, string | number>;
}

/**
 * Renders a message that contains markup (links, emphasis). Text outside the
 * placeholders comes from the active translation, so word order stays natural.
 */
export const RichText = ({ message, slots, vars }: RichTextProps) => {
    const { t } = useI18n();
    const parts = t(message, vars).split(/(\{\w+\})/g);

    return (
        <>
            {parts.map((part, index) => {
                const placeholder = /^\{(\w+)\}$/.exec(part);
                const slot = placeholder ? slots?.[placeholder[1]] : undefined;

                return <Fragment key={index}>{slot ?? part}</Fragment>;
            })}
        </>
    );
};
