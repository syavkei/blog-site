import React, { useState } from "react";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import { Editor } from "primereact/editor";
import axios from "axios";

export default function CustomInputEditor({
    label,
    name,
    value,
    onchange,
    onfocus,
    error,
    disabled = false,
    className = "flex flex-column gap-2 mb-3",
    isMandatory = false,
    setData = null,
    formData = null,
}) {
    const [editorValue, setEditorValue] = useState(value || "");
    const uploadImage = (base64Image) => {
        return axios.post("/admin/image-upload", { image: base64Image });
    };

    const replaceImage = (base64Image, imageUrl, currentHtml) => {
        const parser = new DOMParser();

        const doc = parser.parseFromString(currentHtml, "text/html");

        doc.querySelectorAll("img").forEach((img) => {
            if (img.src === base64Image) {
                img.src = imageUrl;
            }
        });

        const updatedHTML = doc.body.innerHTML;
        setEditorValue(updatedHTML);
        setData(name, updatedHTML);

        // setData(name, doc.body.innerHTML);
    };

    const handleTextChange = async (e) => {
        const currentHtml = e.htmlValue;
        setEditorValue(currentHtml);
        const deltaOps = e.delta.ops;

        for (const op of deltaOps) {
            if (op.insert?.image?.startsWith("data:image/")) {
                const base64Image = op.insert.image;

                try {
                    const response = await uploadImage(base64Image);
                    const imageUrl = response.data.url;

                    replaceImage(base64Image, imageUrl, currentHtml);
                } catch (error) {
                    console.error("Image upload failed:", error);
                }
            } else {
                setData(name, currentHtml);
            }
        }
    };

    const header = () => {
        return disabled ? "" : null;
    };
    return (
        <div className={className}>
            <InputLabel htmlFor={name}>
                {label}
                {isMandatory ? <span className="text-red-600">*</span> : ""}
            </InputLabel>
            <Editor
                id={name}
                value={value}
                // onTextChange={onchange}
                onTextChange={(e) => handleTextChange(e)}
                className={`${
                    error
                        ? `text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300`
                        : ""
                }`}
                onFocus={onfocus}
                disabled={disabled}
                style={{ height: disabled ? "auto" : "320px" }}
                readOnly={disabled}
                // headerTemplate={header}
            />
            <InputError message={error} />
        </div>
    );
}
