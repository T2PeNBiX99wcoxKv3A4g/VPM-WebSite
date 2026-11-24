import {CheckIcon} from "./icons";

interface ToastProps {
    message: string | null;
}

export const Toast = ({message}: ToastProps) => (
    <div id="toastNotification" className="toast" role="status" aria-live="polite" hidden={!message}>
        <div className="toast-icon">
            <CheckIcon/>
        </div>
        <span id="toastMessage" className="toast-message">
            {message ?? "Copied to clipboard!"}
        </span>
    </div>
);
