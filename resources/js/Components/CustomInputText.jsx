import { InputText } from "primereact/inputtext";
import React from "react";
import InputError from "./InputError";
import InputLabel from "./InputLabel";

export default function CustomInputText({
    label,
    name,
    value,
    onchange,
    onfocus,
    error,
    disabled = false,
    className = "flex flex-column gap-2 mb-3",
    isMandatory = false,
}) {
    return (
        <div className={className}>
            <InputLabel htmlFor={name}>
                {label}
                {isMandatory ? <span className="text-red-600">*</span> : ""}
            </InputLabel>
            <InputText
                id={name}
                value={value}
                onChange={onchange}
                className={`${
                    error
                        ? `text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300`
                        : ""
                }`}
                onFocus={onfocus}
                disabled={disabled}
            />
            <InputError message={error} />
        </div>
    );
}
