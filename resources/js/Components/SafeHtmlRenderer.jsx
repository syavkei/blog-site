import React from "react";
import DOMPurify from "dompurify";

export default function SafeHtmlRenderer({ htmlContent }) {
    // Sanitize the HTML content
    const cleanHtml = DOMPurify.sanitize(htmlContent);

    return (
        <div
            style={{ textAlign: "justify" }}
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
    );
}
