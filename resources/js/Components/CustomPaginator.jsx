import { router } from "@inertiajs/react";
import { Paginator } from "primereact/paginator";
import React, { useEffect, useState } from "react";

export default function CustomPaginator({
    links,
    firstPageUrl,
    lastPageUrl,
    nextPageUrl,
    prevPageUrl,
    totalRecords,
    path,
    search,
}) {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
        router.get(
            `${path}`,
            {
                page: event.page + 1,
                search: search,
            },
            { preserveState: true, preserveScroll: true }
        );
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const page = parseInt(params.get("page")) || 1;
        setFirst((page - 1) * rows);
    }, [rows]);

    return (
        <Paginator
            first={first}
            rows={rows}
            totalRecords={totalRecords}
            onPageChange={onPageChange}
            rowsPerPageOptions={[10, 20, 30, 40, 50]}
            template={{
                layout: "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport",
            }}
            leftContent={`Total Data: ${totalRecords}`}
            rightContent={`Data ${first + 1} - ${
                first + rows
            } from ${totalRecords}`}
        />
    );
}
