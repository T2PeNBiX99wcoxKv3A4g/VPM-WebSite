import styled from "styled-components";
import { mobile } from "../styles/media";

export const HeroSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 2.5rem;
`;

export const BannerContainer = styled.div`
    width: 100%;
    margin-bottom: 1.5rem;
    border-radius: var(--radius-lg);
    overflow: hidden;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-md);
    background: var(--bg-card);
    /* Decorative image: clicking it must not place a text caret. */
    user-select: none;
    -webkit-user-select: none;
`;

export const BannerImage = styled.div<{ $image: string }>`
    width: 100%;
    aspect-ratio: 5 / 1.2;
    background-image: url(${props => props.$image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: transform var(--transition-normal);

    ${BannerContainer}:hover & {
        transform: scale(1.01);
    }
`;

export const HeroContent = styled.div`
    max-width: 720px;
    margin: 0 auto 1.75rem;
`;

export const RepoBadge = styled.div`
    display: inline-block;
    padding: 0.3rem 0.85rem;
    font-size: 0.78rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--accent-primary);
    background: var(--bg-badge);
    border: 1px solid rgba(59, 130, 246, 0.25);
    border-radius: var(--radius-full);
    margin-bottom: 0.85rem;
`;

export const HeroTitle = styled.h1`
    font-size: 2.25rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.2;
    margin-bottom: 0.75rem;
    background: linear-gradient(135deg, var(--text-primary) 30%, var(--accent-secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @media ${mobile} {
        font-size: 1.75rem;
    }
`;

export const HeroDescription = styled.p`
    font-size: 1.05rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1rem;
`;

export const HeroMeta = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
`;

export const AuthorTag = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
    padding: 0.35rem 0.75rem;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-full);
`;

export const AuthorName = styled.a`
    color: var(--accent-primary);
    font-weight: 600;
    text-decoration: none;
    transition: color var(--transition-fast);

    &:hover {
        text-decoration: underline;
    }
`;

/** Same look as {@link AuthorName} for listings without an author URL. */
export const AuthorNameText = styled.span`
    color: var(--accent-primary);
    font-weight: 600;
`;

export const ActionCard = styled.div`
    width: 100%;
    max-width: 820px;
    background: var(--bg-card);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: 1.25rem 1.5rem;
    box-shadow: var(--shadow-md);
    text-align: left;

    @media ${mobile} {
        padding: 1rem;
    }
`;

export const ActionCardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
`;

export const ActionCardLabel = styled.span`
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 0.04em;
`;

export const ActionCardHint = styled.span`
    font-size: 0.8rem;
    color: var(--text-muted);
`;

export const ActionCardBody = styled.div`
    display: flex;
    gap: 0.75rem;
    align-items: center;
    width: 100%;

    @media ${mobile} {
        flex-direction: column;
    }
`;

export const UrlInputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
`;

/** Shared by the hero card and the install guide dialog. */
export const UrlInput = styled.input`
    width: 100%;
    padding: 0.65rem 1rem 0.65rem 2.5rem;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--text-primary);
    background: var(--bg-input);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    outline: none;
    transition: all var(--transition-fast);
    cursor: text;

    &:focus {
        background: var(--bg-input-focus);
        border-color: var(--border-color-focus);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
`;
