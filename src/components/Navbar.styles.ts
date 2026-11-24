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
