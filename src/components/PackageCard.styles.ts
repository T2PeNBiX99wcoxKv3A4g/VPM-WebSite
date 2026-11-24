import styled from "styled-components";
import { mobile } from "../styles/media";

export const Row = styled.div`
    display: block;
    width: 100%;
`;

export const Card = styled.div`
    background: var(--bg-card);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 1.35rem 1.5rem;
    box-shadow: var(--shadow-sm);
    transition: all var(--transition-normal);
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 4px;
        background: var(--accent-gradient);
        opacity: 0;
        transition: opacity var(--transition-fast);
    }

    &:hover {
        background: var(--bg-card-hover);
        border-color: var(--border-color-hover);
        box-shadow: var(--shadow-lg);
        transform: translateY(-2px);
    }

    &:hover::before {
        opacity: 1;
    }

    @media ${mobile} {
        padding: 1.15rem;
    }
`;

export const CardTop = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;

    @media ${mobile} {
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const TitleArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    flex: 1;
`;

export const HeaderRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
`;

export const DisplayName = styled.h3`
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--text-primary);
    margin: 0;
`;

export const Badges = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
`;

export const Badge = styled.span`
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.55rem;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: var(--radius-sm);
    line-height: 1.2;
`;

export const VersionBadge = styled(Badge)`
    font-family: var(--font-mono);
    background: var(--bg-input);
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
`;

// Packages are typed by their dependencies: avatar, world or neither.
const typePalettes = {
    avatar: {
        background: "rgba(236, 72, 153, 0.15)",
        color: "#f472b6",
        border: "1px solid rgba(236, 72, 153, 0.25)",
    },
    world: {
        background: "rgba(16, 185, 129, 0.15)",
        color: "#34d399",
        border: "1px solid rgba(16, 185, 129, 0.25)",
    },
    tool: {
        background: "rgba(14, 165, 233, 0.15)",
        color: "#38bdf8",
        border: "1px solid rgba(14, 165, 233, 0.25)",
    },
    any: {
        background: "rgba(99, 102, 241, 0.15)",
        color: "#818cf8",
        border: "1px solid rgba(99, 102, 241, 0.25)",
    },
} as const;

export const TypeBadge = styled(Badge)<{ $type: string }>`
    text-transform: capitalize;
    background: ${props => (typePalettes[props.$type.toLowerCase() as keyof typeof typePalettes] ?? typePalettes.any).background};
    color: ${props => (typePalettes[props.$type.toLowerCase() as keyof typeof typePalettes] ?? typePalettes.any).color};
    border: ${props => (typePalettes[props.$type.toLowerCase() as keyof typeof typePalettes] ?? typePalettes.any).border};
`;

export const IdRow = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
`;

export const IdText = styled.span`
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-muted);
`;

export const Description = styled.p`
    font-size: 0.92rem;
    color: var(--text-secondary);
    line-height: 1.55;
    margin: 0;
`;

export const CardActions = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.25rem;
    flex-wrap: wrap;
`;
