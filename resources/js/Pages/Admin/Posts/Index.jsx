import CustomActionButton from "@/Components/CustomActionButton";
import CustomIndexToolbar from "@/Components/CustomIndexToolbar";
import CustomPaginator from "@/Components/CustomPaginator";
import CustomShowSingleFile from "@/Components/CustomShowSingleFile";
import Layout from "@/Layouts/layout/layout";
import { Head, router } from "@inertiajs/react";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Image } from "primereact/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AdminPostIndex({ posts }) {
    const [search, setSearch] = useState("");
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        router.get(
            route("admin.posts.index"),
            { search: e.target.value },
            { preserveState: true, preserveScroll: true }
        );
    };
    const actionBodyTemplate = (post) => {
        return (
            <CustomActionButton
                viewButton={true}
                editButton={true}
                deleteButton={true}
                viewRoute={route("admin.posts.show", post)}
                editRoute={route("admin.posts.edit", post)}
                deleteFunction={() => confirmDelete(post)}
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
                router.delete(route("admin.posts.destroy", category), {
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

    const imageBodyTemplate = (post) => {
        return (
            <>
                <span className="p-column-title">Photo</span>
                <Image
                    src={`${post.image_path}`}
                    alt="Image"
                    width="90"
                    preview
                />
            </>
        );
    };

    return (
        <>
            <Head title="Post" />
            <Layout>
                <Card title="Post">
                    <CustomIndexToolbar
                        addLink={route("admin.posts.create")}
                        onChangeSearchOnPagination={handleSearchChange}
                        search={search}
                    />
                    <DataTable value={posts.data} dataKey="id" showGridlines>
                        <Column
                            field="id"
                            header="Action"
                            headerClassName="text-center font-bold"
                            style={{ textWrap: "nowrap" }}
                            body={actionBodyTemplate}
                        />
                        <Column
                            field="id"
                            header="ID post"
                            headerClassName="text-center font-bold"
                            style={{ textWrap: "nowrap" }}
                        />
                        <Column
                            field="title"
                            header="Title"
                            headerClassName="text-center font-bold"
                            style={{ textWrap: "nowrap" }}
                        />
                        <Column
                            field="slug"
                            header="Slug"
                            headerClassName="text-center font-bold"
                            style={{ textWrap: "nowrap" }}
                        />
                        <Column
                            field="image"
                            header="Image"
                            headerClassName="text-center font-bold"
                            style={{ textWrap: "nowrap" }}
                            body={imageBodyTemplate}
                        />
                    </DataTable>
                    <CustomPaginator
                        links={posts.links}
                        firstPageUrl={posts.first_page_url}
                        nextPageUrl={posts.next_page_url}
                        prevPageUrl={posts.prev_page_url}
                        lastPageUrl={posts.last_page_url}
                        totalRecords={posts.total}
                        path={posts.path}
                        search={search}
                    />
                </Card>
            </Layout>
        </>
    );
}
