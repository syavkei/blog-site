import { Link } from "@inertiajs/react";
import { Button } from "primereact/button";
import React from "react";

export default function CustomFooterButton({
    editButton = false,
    cancelButton = false,
    saveButton = false,
    editRoute = null,
    cancelRoute = null,
    processing = false,
    children,
}) {
    return (
        <>
            {editButton && (
                <Link href={editRoute}>
                    <Button
                        className="mr-2"
                        tooltip="Edit"
                        tooltipOptions={{ position: "bottom" }}
                        severity="info"
                    >
                        Edit
                    </Button>
                </Link>
            )}
            {saveButton && (
                <Button
                    type="submit"
                    className="mr-2"
                    disabled={processing}
                    tooltip="Save"
                    tooltipOptions={{ position: "bottom" }}
                    severity="info"
                >
                    Save
                </Button>
            )}
            {children}
            {cancelButton && (
                <Link href={cancelRoute}>
                    <Button
                        severity="secondary"
                        tooltip="Cancel"
                        tooltipOptions={{ position: "bottom" }}
                    >
                        Cancel
                    </Button>
                </Link>
            )}
        </>
    );
}
