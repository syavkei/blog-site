import CustomIndexToolbar from "@/Components/CustomIndexToolbar";
import Layout from "@/Layouts/layout/layout";
import { Head } from "@inertiajs/react";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

export default function RoleIndex({ roles }) {
    console.log("roles", roles);
    return (
        <>
            <Head title="Role" />
            <Layout>
                <Card title="Role">
                    <CustomIndexToolbar addLink={route("admin.roles.create")} />
                    <DataTable value={roles.data} dataKey="id" showGridlines>
                        <Column field="id" header="No" />
                        <Column field="name" header="Name" />
                    </DataTable>
                </Card>
            </Layout>
        </>
    );
}
