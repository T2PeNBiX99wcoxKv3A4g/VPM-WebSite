import { CheckIcon } from "./icons";
import { ToastContainer, ToastIcon, ToastMessage } from "./Toast.styles";
import { useI18n } from "../i18n/Provider";

interface ToastProps {
    message: string | null;
}

export const Toast = ({ message }: ToastProps) => {
    const { t } = useI18n();

    return (
        <ToastContainer id="toastNotification" role="status" aria-live="polite" hidden={!message}>
            <ToastIcon>
                <CheckIcon />
            </ToastIcon>
            <ToastMessage id="toastMessage">{message ?? t("toast.copied")}</ToastMessage>
        </ToastContainer>
    );
};
