import styled from "styled-components";
import { mobile } from "../styles/media";

export const Section = styled.section`
    width: 100%;
`;

export const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;

    @media ${mobile} {
        flex-direction: column;
        align-items: stretch;
    }
`;

export const TitleWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

export const SectionTitle = styled.h2`
    font-size: 1.45rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-primary);
`;

export const CountBadge = styled.span`
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--accent-primary);
    background: var(--bg-badge);
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-full);
    border: 1px solid rgba(59, 130, 246, 0.2);
`;

export const SearchBox = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    min-width: 280px;
    max-width: 420px;
    flex: 1;

    /* The magnifier sits inside the rounded field. The field has a backdrop
       filter, which is a stacking context of its own, so the glyph needs a
       z-index to stay visible on top of it. */
    & > svg {
        position: absolute;
        left: 0.85rem;
        z-index: 1;
        color: var(--text-muted);
        pointer-events: none;
    }

    @media ${mobile} {
        max-width: 100%;
    }
`;

export const SearchInput = styled.input`
    width: 100%;
    padding: 0.6rem 2.6rem 0.6rem 2.4rem;
    font-family: var(--font-sans);
    font-size: 0.88rem;
    color: var(--text-primary);
    background: var(--bg-card);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-full);
    outline: none;
    transition: all var(--transition-fast);

    &:focus {
        background: var(--bg-input-focus);
        border-color: var(--border-color-focus);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
`;

export const ClearButton = styled.button`
    position: absolute;
    right: 0.75rem;
    background: var(--bg-input);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-full);
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0;
    transition: all var(--transition-fast);

    &:hover {
        color: var(--text-primary);
        background: var(--bg-card-hover);
    }
`;

export const KeyboardTip = styled.div`
    position: absolute;
    right: 0.8rem;
    padding: 0.15rem 0.45rem;
    font-size: 0.72rem;
    font-family: var(--font-mono);
    color: var(--text-muted);
    background: var(--bg-input);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    pointer-events: none;

    @media ${mobile} {
        display: none;
    }
`;

export const Wrapper = styled.div`
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
    margin: 0;
    width: 100%;
`;

export const Grid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`;

export const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 1.5rem;
    text-align: center;
    background: var(--bg-card);
    border: 1px dashed var(--border-color);
    border-radius: var(--radius-lg);
    margin-top: 1rem;
`;

export const EmptyIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;
    border-radius: var(--radius-full);
    background: var(--bg-input);
    color: var(--text-muted);
    margin-bottom: 1.25rem;
`;

export const EmptyTitle = styled.h3`
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
`;

export const EmptyDesc = styled.p`
    font-size: 0.9rem;
    color: var(--text-secondary);
    max-width: 360px;
    margin-bottom: 1.25rem;
`;
