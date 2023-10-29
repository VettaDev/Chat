import { type } from "os";

export interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    fulllWidth?: boolean;
    children: React.ReactNode;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}
