"useClient";
import clsx from "clsx";
import { InputProps } from "./types";

export const Input: React.FC<InputProps> = ({
    label,
    id,
    type,
    register,
    required,
    errors,
    disabled,
}) => {
    return (
        <div>
            <label
                className="block mb-2 text-sm font-medium leading-6 text-gray-500"
                htmlFor={id}
            >
                {label}
            </label>
            <div>
                <input
                    id={id}
                    type={type}
                    disabled={disabled}
                    autoComplete="on"
                    {...register(id, { required })}
                    className={clsx(
                        `
                    form-input
                    block
                    w-full
                    rounded-md
                    border-0
                    py-1.5
                    text-gray-900
                    shadow-sm
                    ring-1
                    ring-gray-300
                    ring-inset
                    placeholder:text-gray-400
                    focus:ring-2
                    focus:ring-inset
                    focus:ring-sky-600
                    sm:text-sm
                    sm:leading-6
                    `,
                        errors[id] && "focus:ring-rose-500",
                        disabled && "opacity-50 cursor-default",
                    )}
                ></input>
            </div>
        </div>
    );
};
