import styled from "styled-components";

export const Menu = styled.div`
    position: absolute;
    z-index: 100;
    background: var(--bg-modal);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    padding: 0.35rem;
    min-width: 160px;
`;

export const MenuItem = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-sm);
    background: transparent;
    border: none;
    color: var(--text-primary);
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: background var(--transition-fast), color var(--transition-fast);

    &:hover {
        background: var(--bg-input);
        color: var(--accent-primary);
    }
`;
