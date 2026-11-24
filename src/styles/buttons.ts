import { css, styled } from "styled-components";
import { mobile } from "./media";

export const buttonBase = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 0.65rem 1.15rem;
    font-family: var(--font-sans);
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1.25;
    border-radius: var(--radius-md);
    border: 1px solid transparent;
    cursor: pointer;
    transition: all var(--transition-fast);
    text-decoration: none;
    white-space: nowrap;
    user-select: none;
    box-sizing: border-box;

    &:active {
        transform: scale(0.97);
    }
`;

const primary = css`
    background: var(--accent-gradient);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.35);

    &:hover {
        background: var(--accent-gradient-hover);
        box-shadow: var(--accent-glow);
        transform: translateY(-1px);
    }
`;

const secondary = css`
    background: var(--bg-input);
    color: var(--text-primary);
    border-color: var(--border-color);

    &:hover {
        background: var(--bg-card-hover);
        border-color: var(--border-color-hover);
        transform: translateY(-1px);
    }
`;

const outline = css`
    background: transparent;
    color: var(--text-secondary);
    border-color: var(--border-color);

    &:hover {
        color: var(--text-primary);
        background: var(--bg-input);
        border-color: var(--border-color-hover);
        transform: translateY(-1px);
    }
`;

const iconOnly = css`
    width: 38px;
    height: 38px;
    min-height: 38px;
    padding: 0;
    border-radius: var(--radius-md);
    background: var(--bg-input);
    color: var(--text-secondary);
    border-color: var(--border-color);

    &:hover {
        color: var(--text-primary);
        border-color: var(--border-color-hover);
        transform: translateY(-1px);
    }
`;

const ghost = css`
    background: transparent;
    border-color: transparent;
    color: var(--text-muted);
    padding: 2px;
    border-radius: 4px;

    &:hover {
        color: var(--accent-primary);
        background: var(--bg-input);
    }
`;

const small = css`
    height: 32px;
    min-height: 32px;
    padding: 0 0.85rem;
    font-size: 0.82rem;
    line-height: 1.25;
    border-radius: var(--radius-sm);
`;

const iconSmall = css`
    width: 32px;
    height: 32px;
    min-height: 32px;
    padding: 0;
    border-radius: var(--radius-sm);
`;

const glow = css`
    position: relative;

    &::after {
        content: "";
        position: absolute;
        inset: -2px;
        border-radius: calc(var(--radius-md) + 2px);
        background: var(--accent-gradient);
        z-index: -1;
        opacity: 0;
        transition: opacity var(--transition-fast);
        filter: blur(8px);
    }

    &:hover::after {
        opacity: 0.6;
    }
`;

export type ButtonVariant = "primary" | "secondary" | "outline" | "icon" | "ghost";

export interface ButtonStyleProps {
    $variant?: ButtonVariant;
    $small?: boolean;
    $glow?: boolean;
}

const variantRules = (variant: ButtonVariant) => {
    switch (variant) {
        case "primary":
            return primary;
        case "secondary":
            return secondary;
        case "outline":
            return outline;
        case "icon":
            return iconOnly;
        case "ghost":
            return ghost;
    }
};

// Transient props (`$…`) keep styled-components from forwarding them to the DOM.
export const Button = styled.button<ButtonStyleProps>`
    ${buttonBase}
    ${props => variantRules(props.$variant ?? "primary")}
    ${props => props.$glow && glow}
    ${props => props.$small && props.$variant === "icon" && iconSmall}
    ${props => props.$small && props.$variant !== "icon" && small}
`;

export const ButtonLink = styled.a<ButtonStyleProps>`
    ${buttonBase}
    ${props => variantRules(props.$variant ?? "primary")}
    ${props => props.$glow && glow}
    ${props => props.$small && props.$variant === "icon" && iconSmall}
    ${props => props.$small && props.$variant !== "icon" && small}
`;

/** Inline "link" button used inside the dialogs. */
export const LinkButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    background: transparent;
    border: none;
    color: var(--accent-primary);
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    padding: 0;

    &:hover {
        text-decoration: underline;
    }
`;

/** Container that stacks the hero action buttons on narrow screens. */
export const ActionButtons = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;

    @media ${mobile} {
        width: 100%;
        justify-content: stretch;

        & > * {
            flex: 1;
        }
    }
`;
