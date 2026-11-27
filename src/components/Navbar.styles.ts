import styled from "styled-components";

export const NavbarBar = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.25rem;
    background: var(--bg-card);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    margin-bottom: 2rem;
`;

export const Brand = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

export const LogoBadge = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-md);
    background: var(--accent-gradient);
    color: #ffffff;
    box-shadow: var(--accent-glow);
`;

export const Title = styled.span`
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: -0.01em;
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const Actions = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

export const SourceLink = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.45rem 0.85rem;
    border-radius: var(--radius-md);
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--text-secondary);
    background: var(--bg-input);
    border: 1px solid var(--border-color);
    text-decoration: none;
    transition: all var(--transition-fast);

    &:hover {
        color: var(--text-primary);
        border-color: var(--border-color-hover);
        transform: translateY(-1px);
    }
`;

export const ThemeToggle = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-md);
    background: var(--bg-input);
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);

    &:hover {
        color: var(--text-primary);
        border-color: var(--border-color-hover);
        transform: translateY(-1px);
    }

    /* Default state before the theme attribute is applied. */
    .sun-icon {
        display: block;
    }

    .moon-icon {
        display: none;
    }

    html[data-theme="light"] & {
        .sun-icon {
            display: none;
        }

        .moon-icon {
            display: block;
        }
    }

    html[data-theme="dark"] & {
        .sun-icon {
            display: block;
        }

        .moon-icon {
            display: none;
        }
    }
`;

export const LanguageLabel = styled.label`
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--text-muted);
    transition: color var(--transition-fast);

    &:focus-within {
        color: var(--accent-primary);
    }

    & > svg {
        flex: none;
    }
`;

export const LanguageSelect = styled.select`
    appearance: none;
    padding: 0.4rem 0.6rem;
    font-family: var(--font-sans);
    font-size: 0.85rem;
    color: var(--text-primary);
    background-color: var(--bg-input);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: border-color var(--transition-fast), background var(--transition-fast),
        box-shadow var(--transition-fast);

    &:hover {
        border-color: var(--border-color-hover);
        background: var(--bg-card-hover);
    }

    &:focus-visible {
        outline: none;
        border-color: var(--border-color-focus);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }

    option {
        color: var(--text-primary);
        background: var(--bg-modal);
    }
`;

/** Screen-reader only label for the language picker. */
export const VisuallyHidden = styled.span`
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
`;
