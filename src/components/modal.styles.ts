import styled, { keyframes } from "styled-components";
import { mobile } from "../styles/media";

const modalFadeIn = keyframes`
    from {
        opacity: 0;
        transform: scale(0.96) translateY(10px);
    }

    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
`;

export const Overlay = styled.div<{ $stacked?: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: ${props => (props.$stacked ? 1100 : 1000)};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    overflow-y: auto;
    opacity: 1;
    visibility: visible;
    transition: opacity var(--transition-normal), visibility var(--transition-normal);
`;

export const Dialog = styled.div`
    width: 100%;
    max-width: 620px;
    background: var(--bg-modal);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-xl);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    animation: ${modalFadeIn} 0.25s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
`;

export const TitleWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 0.85rem;
`;

export const IconBadge = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background: var(--bg-badge);
    color: var(--accent-primary);
    border: 1px solid rgba(59, 130, 246, 0.2);
`;

export const Title = styled.h3`
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.01em;
    margin: 0;
`;

export const Subtitle = styled.p`
    font-size: 0.82rem;
    color: var(--text-muted);
    margin-top: 0.15rem;
`;

export const MetaRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.2rem;
`;

export const MetaId = styled.span`
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-muted);
`;

export const CloseButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: var(--radius-sm);
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    transition: all var(--transition-fast);

    &:hover {
        color: var(--text-primary);
        background: var(--bg-input);
    }
`;

export const Body = styled.div`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    max-height: 70vh;
    overflow-y: auto;
`;

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`;

export const SectionHeaderFlex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const SectionTitle = styled.h5`
    font-size: 0.82rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin: 0;
`;

export const SectionText = styled.p`
    font-size: 0.95rem;
    color: var(--text-secondary);
    line-height: 1.6;
`;

export const Grid2 = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    @media ${mobile} {
        grid-template-columns: 1fr;
    }
`;

export const InlineInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.92rem;
    color: var(--text-secondary);
`;

export const AccentLink = styled.a`
    color: var(--accent-primary);
    font-weight: 500;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export const DepList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin: 0;
    padding: 0;

    & > li {
        font-family: var(--font-mono);
        font-size: 0.82rem;
        padding: 0.35rem 0.65rem;
        background: var(--bg-input);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-sm);
        color: var(--text-secondary);
    }
`;

export const TagsCloud = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;

    & > span {
        background: var(--bg-input);
        color: var(--text-secondary);
        border: 1px solid var(--border-color);
        font-size: 0.78rem;
    }
`;

export const UrlBox = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-top: 0.25rem;
`;

export const FooterActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border-color);
`;

/* Install guide specifics */

export const GuideCard = styled.div`
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 1.15rem;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
`;

export const GuideTitle = styled.h4`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
`;

export const GuideBadge = styled.span`
    padding: 0.15rem 0.45rem;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--accent-primary);
    background: var(--bg-badge);
    border-radius: 4px;
`;

export const GuideDesc = styled.p`
    font-size: 0.88rem;
    color: var(--text-secondary);
    line-height: 1.5;
    margin: 0;
`;

export const GuideQuickAction = styled.div`
    margin-top: 0.25rem;
`;

export const GuideSteps = styled.ol`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    padding: 0;
    margin: 0;

    & > li {
        display: flex;
        align-items: flex-start;
        gap: 0.65rem;
        font-size: 0.88rem;
        color: var(--text-secondary);
        line-height: 1.5;
    }

    strong a {
        color: var(--accent-primary);
        text-decoration: none;
    }

    strong a:hover {
        text-decoration: underline;
    }
`;

export const StepNumber = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    min-width: 22px;
    border-radius: var(--radius-full);
    background: var(--bg-input);
    border: 1px solid var(--border-color);
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--accent-primary);
`;

export const GuideFooterNote = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.82rem;
    color: var(--text-muted);
    margin-top: 0.25rem;

    a {
        color: var(--accent-primary);
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
`;
