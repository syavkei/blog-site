import React from "react";
import InputLabel from "./InputLabel";

export default function CustomShowSingleFile({
    className = "flex flex-column gap-2 mb-3",
    label,
    isMandatory = false,
    filePath = null,
    fileClassName = null,
}) {
    const getFileExtension = (filePath) => {
        const normalizedPath = filePath.replace(/\\/g, "/");
        const pathParts = normalizedPath.split("/");
        const filename = pathParts.pop();
        const filenameParts = filename.split(".");
        const extension = filenameParts.pop().toLowerCase();
        return extension;
    };

    const fileExtension = filePath && getFileExtension(filePath);

    let content;

    if (fileExtension === "pdf") {
        // Render PDF in an iframe
        content = (
            <iframe
                src={filePath}
                title="PDF Document"
                width="100%"
                height="600px"
                frameBorder="0"
            />
        );
    } else if (
        ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(fileExtension)
    ) {
        // Render image
        content = <img src={filePath} alt={label} className={fileClassName} />;
    } else {
        // Render a download link or message
        content = (
            <div>
                <p>File preview is not available.</p>
                <a href={filePath} download>
                    {filePath ? "Click here to download the file." : ``}
                </a>
            </div>
        );
    }

    return (
        <div className={className}>
            <InputLabel>
                {label}
                {isMandatory ? <span className="text-red-600">*</span> : ""}
            </InputLabel>
            {content}
        </div>
    );
}
