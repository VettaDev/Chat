import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface SelectProps {
    id: string;
    label: string;
    errors: FieldErrors;
    required?: boolean;
    disabled?: boolean;
    value?: Record<string, any>;
    options: { label: string; value: string }[];
    onChange: (value: Record<string, any>) => void;
    register?: UseFormRegister<FieldValues>;
}
