import { Link } from "@inertiajs/react";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import React from "react";

function CustomActionButton({
    viewButton = false,
    editButton = false,
    deleteButton = false,
    viewRoute = null,
    editRoute = null,
    deleteFunction = null,
    children,
}) {
    return (
        <div style={{ whiteSpace: "nowrap" }}>
            {viewButton && (
                <Link href={viewRoute} className="mx-1">
                    <Button
                        icon={PrimeIcons.EYE}
                        severity="info"
                        tooltip="View"
                        tooltipOptions={{ position: "bottom" }}
                        type="button"
                    />
                </Link>
            )}
            {editButton && (
                <Link href={editRoute} className="mx-1">
                    <Button
                        icon={PrimeIcons.PENCIL}
                        severity="info"
                        tooltip="Edit"
                        tooltipOptions={{ position: "bottom" }}
                        type="button"
                    />
                </Link>
            )}
            {deleteButton && (
                <Button
                    icon={PrimeIcons.TRASH}
                    className="mx-1"
                    onClick={deleteFunction}
                    severity="info"
                    tooltip="Delete"
                    tooltipOptions={{ position: "bottom" }}
                    type="button"
                />
            )}
            {children}
        </div>
    );
}

export default CustomActionButton;
