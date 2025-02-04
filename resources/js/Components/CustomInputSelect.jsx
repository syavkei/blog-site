import React from "react";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function CustomInputSelect({
    label,
    name,
    value,
    onchange,
    onfocus,
    error,
    options,
    valuetempalte = null,
    itemtemplate = null,
    isMulti = false,
    disabled = false,
    className = "flex flex-column gap-2 mb-3",
    isMandatory = false,
    isClearable = true,
}) {
    const animatedComponents = makeAnimated();
    return (
        <div className={className}>
            <InputLabel htmlFor={name}>
                {label}
                {isMandatory ? <span className="text-red-600">*</span> : ""}
            </InputLabel>
            <Select
                id={name}
                components={animatedComponents}
                options={options}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                defaultValue={value}
                onChange={onchange}
                onFocus={onfocus}
                className={`basic-single ${error ? `text-red-900` : ``}`}
                isClearable={isClearable}
                isSearchable={true}
                key={name}
                isMulti={isMulti}
                isDisabled={disabled}
                required={isMandatory}
            />
            <InputError message={error} />
        </div>
    );
}
