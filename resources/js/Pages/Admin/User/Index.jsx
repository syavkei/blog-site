import CustomActionButton from "@/Components/CustomActionButton";
import CustomIndexToolbar from "@/Components/CustomIndexToolbar";
import Layout from "@/Layouts/layout/layout";
import { Head } from "@inertiajs/react";
import { Badge } from "primereact/badge";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

export default function UserIndex({ users }) {
    const actionBodyTemplate = (user) => {
        return (
            <CustomActionButton
                viewButton={true}
                editButton={true}
                deleteButton={true}
                viewRoute={route("admin.users.show", user)}
                editRoute={route("admin.users.edit", user)}
                deleteFunction={() => confirmDelete(user)}
            />
        );
    };

    const approvedBodyTemplate = (user) => {
        return (
            <Badge
                value={user.is_approved ? "Approved" : "Not Approved"}
                severity={user.is_approved ? "success" : "danger"}
            />
        );
    };
    return (
        <>
            <Head title="User" />
            <Layout>
                <Card title="User">
                    <CustomIndexToolbar addLink={route("admin.users.create")} />
                    <DataTable value={users.data} dataKey="id" showGridlines>
                        <Column
                            field="id"
                            header="Action"
                            body={actionBodyTemplate}
                        />
                        <Column field="name" header="Nama" />
                        <Column
                            field="roles"
                            header="Role"
                            sortable
                            body={(user) =>
                                user.roles.map((role) => (
                                    <span key={role.id}>{role.name}</span>
                                ))
                            }
                        ></Column>
                        <Column
                            field="is_approved"
                            header="Is Approved"
                            body={approvedBodyTemplate}
                        />
                    </DataTable>
                </Card>
            </Layout>
        </>
    );
}
