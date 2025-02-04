import CustomIndexToolbar from "@/Components/CustomIndexToolbar";
import Layout from "@/Layouts/layout/layout";
import { Head } from "@inertiajs/react";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

export default function RoleIndex({ permissions }) {
    return (
        <>
            <Head title="Permission" />
            <Layout>
                <Card title="Permission">
                    <CustomIndexToolbar
                        addLink={route("admin.permissions.create")}
                    />
                    <DataTable
                        value={permissions.data}
                        dataKey="id"
                        showGridlines
                    >
                        <Column field="id" header="No" />
                        <Column field="name" header="Name" />
                    </DataTable>
                </Card>
            </Layout>
        </>
    );
}
