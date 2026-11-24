import styled, { keyframes } from "styled-components";

const toastSlideUp = keyframes`
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
`;

export const ToastContainer = styled.div`
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(0);
    background: var(--bg-modal);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-xl), 0 0 20px rgba(59, 130, 246, 0.25);
    border-radius: var(--radius-full);
    padding: 0.65rem 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    z-index: 9999;
    animation: ${toastSlideUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
`;

export const ToastIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: var(--radius-full);
    background: #10b981;
    color: #ffffff;
`;

export const ToastMessage = styled.span`
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--text-primary);
`;
