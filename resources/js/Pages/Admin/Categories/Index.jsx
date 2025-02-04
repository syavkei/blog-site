import CustomActionButton from "@/Components/CustomActionButton";
import CustomIndexToolbar from "@/Components/CustomIndexToolbar";
import CustomPaginator from "@/Components/CustomPaginator";
import Layout from "@/Layouts/layout/layout";
import { Head, router } from "@inertiajs/react";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AdminCategoryIndex({ categories }) {
    const [search, setSearch] = useState("");
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        router.get(
            route("admin.categories.index"),
            { search: e.target.value },
            { preserveState: true, preserveScroll: true }
        );
    };
    const actionBodyTemplate = (category) => {
        return (
            <CustomActionButton
                viewButton={true}
                editButton={true}
                deleteButton={true}
                viewRoute={route("admin.categories.show", category)}
                editRoute={route("admin.categories.edit", category)}
                deleteFunction={() => confirmDelete(category)}
            />
        );
    };

    function confirmDelete(category) {
        confirmDialog({
            message: "Are you sure you want to delete this?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            acceptClassName: "p-button-danger",
            acceptLabel: "Yes, Delete",
            rejectLabel: "Cancel",
            accept: () => {
                router.delete(route("admin.categories.destroy", category), {
                    preserveScroll: true,
                });
            },
            reject: () => {
                toast.error("Canceled", {
                    duration: 4000,
                    position: "top-right",

                    // Aria
                    ariaProps: {
                        role: "status",
                        "aria-live": "polite",
                    },
                });
            },
        });
    }

    return (
        <>
            <Head title="Category" />
            <Layout>
                <Card title="Category">
                    <CustomIndexToolbar
                        addLink={route("admin.categories.create")}
                        onChangeSearchOnPagination={handleSearchChange}
                        search={search}
                    />
                    <DataTable
                        value={categories.data}
                        dataKey="id"
                        showGridlines
                    >
                        <Column
                            field="id"
                            header="Action"
                            headerClassName="text-center font-bold"
                            style={{ textWrap: "nowrap" }}
                            body={actionBodyTemplate}
                        />
                        <Column
                            field="id"
                            header="ID category"
                            headerClassName="text-center font-bold"
                            style={{ textWrap: "nowrap" }}
                        />
                        <Column
                            field="name"
                            header="Name"
                            headerClassName="text-center font-bold"
                            style={{ textWrap: "nowrap" }}
                        />
                        <Column
                            field="slug"
                            header="Slug"
                            headerClassName="text-center font-bold"
                            style={{ textWrap: "nowrap" }}
                        />
                    </DataTable>
                    <CustomPaginator
                        links={categories.links}
                        firstPageUrl={categories.first_page_url}
                        nextPageUrl={categories.next_page_url}
                        prevPageUrl={categories.prev_page_url}
                        lastPageUrl={categories.last_page_url}
                        totalRecords={categories.total}
                        path={categories.path}
                        search={search}
                    />
                </Card>
            </Layout>
        </>
    );
}
