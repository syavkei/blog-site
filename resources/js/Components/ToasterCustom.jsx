import { usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ToasterCustom() {
    const page = usePage();
    useEffect(() => {
        if (page?.props?.message?.type === "success") {
            toast.success(page.props.message.body);
        } else if (page?.props?.message?.type === "error") {
            toast.error(page.props.message.body);
        } else {
            ("");
        }
    }, [page.props.message]);

    return (
        <div>
            <Toaster position="top-right" />
        </div>
    );
}
