import { useEffect, useState, type ReactNode } from "react";
import { Button, type ButtonVariant } from "../styles/buttons";

interface CopyButtonProps {
    value: string;
    onCopy: (text: string, message?: string) => Promise<void>;
    message?: string;
    id?: string;
    title?: string;
    ariaLabel?: string;
    icon: ReactNode;
    label?: string;
    variant?: ButtonVariant;
    small?: boolean;
}

/**
 * Copy buttons flash "Copied!" for a moment, which is what the previous plain
 * JavaScript handlers did by swapping the label text.
 */
export const CopyButton = ({
    value,
    onCopy,
    message,
    id,
    title,
    ariaLabel,
    icon,
    label,
    variant = "secondary",
    small = false,
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
        <Button
            type="button"
            id={id}
            $variant={variant}
            $small={small}
            title={title}
            aria-label={ariaLabel}
            onClick={handleClick}
        >
            {icon}
            {label ? <span>{copied ? "Copied!" : label}</span> : null}
        </Button>
    );
};
