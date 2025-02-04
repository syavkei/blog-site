import { Link } from "@inertiajs/react";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import React from "react";

export default function CustomIndexToolbar({
    addLink = null,
    importButton = false,
    dataToExport = [],
    cols,
    exportColumns,
    fileName = "data",
    excelExportData = [],
    onchangeGlobalFilter = null,
    onChangeSearchOnPagination = null,
    search = null,
    batchFilter,
    branchFilter,
    children,
}) {
    const rightToolbar = () => {
        return (
            <>
                <div className="my-1">
                    {onChangeSearchOnPagination && (
                        <InputText
                            value={search}
                            onChange={(e) => onChangeSearchOnPagination(e)}
                            placeholder="Search data..."
                            className="mx-1"
                        />
                    )}
                    {addLink && (
                        <Link href={addLink}>
                            <Button
                                label="Add"
                                icon={PrimeIcons.PLUS}
                                tooltip="Tambah Data Baru"
                                tooltipOptions={{ position: "bottom" }}
                                severity="info"
                            />
                        </Link>
                    )}
                </div>
            </>
        );
    };
    return <Toolbar end={rightToolbar} className="mb-4"></Toolbar>;
}
