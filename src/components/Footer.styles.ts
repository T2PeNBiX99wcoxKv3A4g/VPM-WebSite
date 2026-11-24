import styled from "styled-components";

export const FooterBar = styled.footer`
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border-color);
    text-align: center;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
`;

export const Text = styled.p`
    font-size: 0.85rem;
    color: var(--text-muted);

    a {
        color: var(--text-secondary);
        text-decoration: none;
        font-weight: 500;
    }

    a:hover {
        color: var(--accent-primary);
        text-decoration: underline;
    }
`;

export const Links = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.82rem;

    a {
        color: var(--text-secondary);
        text-decoration: none;
    }

    a:hover {
        color: var(--accent-primary);
        text-decoration: underline;
    }
`;

export const DotSeparator = styled.span`
    color: var(--text-muted);
`;
