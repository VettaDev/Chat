import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface InputProps {
    id: string;
    label: string;
    errors: FieldErrors;
    type?: string;
    required?: boolean;
    disabled?: boolean;
    register: UseFormRegister<FieldValues>;
}
