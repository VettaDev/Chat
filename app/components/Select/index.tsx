import React from "react";
import { SelectProps } from "./types";
import ReactSelect from "react-select";

const Select: React.FC<SelectProps> = ({
    label,
    value,
    onChange,
    options,
    disabled,
}) => {
    return (
        <div className="z-[100]">
            <label
                htmlFor={label}
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                {label}
            </label>
            <ReactSelect
                isDisabled={disabled}
                value={value}
                onChange={onChange}
                isMulti={true}
                options={options}
                menuPortalTarget={document.body}
                styles={{
                    menuPortal: (base, props) => ({
                        ...base,
                        zIndex: 9999,
                    }),
                }}
                classNames={{
                    control: () => "text-sm",
                }}
                className="mb-8"
            />
        </div>
    );
};

export default Select;
