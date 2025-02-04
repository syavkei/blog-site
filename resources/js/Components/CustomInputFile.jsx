import React from "react";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import { FileUpload } from "primereact/fileupload";
import "./CustomInputFile.css";

export default function CustomInputFile({
    label,
    name,
    // value,
    onchange,
    onfocus,
    error,
    disabled = false,
    className = "flex flex-column gap-2 mb-3",
    isMandatory = false,
    isMultiple = false,
    mode = "basic",
    chooseLabel = "Pilih File",
    accept = ".pdf,.doc,.docx",
    maxFileSize = 2500000, // 2.5MB
    auto = true,
}) {
    return (
        <div className={className}>
            <InputLabel htmlFor={name}>
                {label}
                {isMandatory ? <span className="text-red-600">*</span> : ""}
                {isMultiple ? (
                    <i className="text-grey-600 text-sm font-normal">
                        {" "}
                        (Multiple)
                    </i>
                ) : (
                    <i className="text-grey-600 text-sm font-normal">
                        {" "}
                        (Single)
                    </i>
                )}
            </InputLabel>
            <FileUpload
                name={name}
                mode={mode}
                customUpload
                uploadHandler={onchange}
                auto={auto}
                chooseLabel={chooseLabel}
                accept={accept}
                maxFileSize={maxFileSize}
                onFocus={onfocus}
                disabled={disabled}
                multiple={isMultiple}
            />
            <InputError message={error} />
        </div>
    );
}
