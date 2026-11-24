import styled from "styled-components";
import { mobile } from "../styles/media";

export const BgGlow = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: var(--bg-glow);
    pointer-events: none;
    z-index: 0;
    opacity: 0.9;
`;

export const AppContainer = styled.div`
    width: 100%;
    max-width: 1060px;
    margin: 0 auto;
    padding: 1.5rem 1.5rem 3rem;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    flex: 1;

    @media ${mobile} {
        padding: 1rem 1rem 2.5rem;
    }
`;
