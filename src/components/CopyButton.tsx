import {type ReactNode, useEffect, useState} from "react";

interface CopyButtonProps {
    value: string;
    onCopy: (text: string, message?: string) => Promise<void>;
    message?: string;
    className?: string;
    id?: string;
    title?: string;
    ariaLabel?: string;
    icon: ReactNode;
    label?: string;
}

/**
 * Copy buttons flash "Copied!" for a moment, which is what the previous plain
 * JavaScript handlers did by swapping the label text and adding `btn-copied`.
 */
export const CopyButton = ({
                               value,
                               onCopy,
                               message,
                               className = "btn btn-secondary",
                               id,
                               title,
                               ariaLabel,
                               icon,
                               label,
                           }: CopyButtonProps) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) {
            return;
        }

        const timeout = window.setTimeout(() => setCopied(false), 1500);
        return () => window.clearTimeout(timeout);
    }, [copied]);

    const handleClick = async () => {
        await onCopy(value, message);
        setCopied(true);
    };

    return (
        <button
            type="button"
            id={id}
            className={`${className}${copied ? " btn-copied" : ""}`}
            title={title}
            aria-label={ariaLabel}
            onClick={handleClick}
        >
            {icon}
            {label ? <span className="btn-copy-text">{copied ? "Copied!" : label}</span> : null}
        </button>
    );
};
