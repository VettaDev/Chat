export interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    fulllWidth?: boolean;
    children: React.ReactNode;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

export interface ModalButtonsProps extends Omit<ButtonProps, "children"> {
    onCancel: () => void;
    mainButtonText: string;
}
