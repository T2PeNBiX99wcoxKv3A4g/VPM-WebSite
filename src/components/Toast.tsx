import { CheckIcon } from "./icons";
import { ToastContainer, ToastIcon, ToastMessage } from "./Toast.styles";

interface ToastProps {
    message: string | null;
}

export const Toast = ({ message }: ToastProps) => (
    <ToastContainer id="toastNotification" role="status" aria-live="polite" hidden={!message}>
        <ToastIcon>
            <CheckIcon />
        </ToastIcon>
        <ToastMessage id="toastMessage">{message ?? "Copied to clipboard!"}</ToastMessage>
    </ToastContainer>
);
