import CustomFooterButton from "@/Components/CustomFooterButton";
import CustomIndexToolbar from "@/Components/CustomIndexToolbar";
import CustomInputSelect from "@/Components/CustomInputSelect";
import CustomInputText from "@/Components/CustomInputText";
import Layout from "@/Layouts/layout/layout";
import { Head, useForm } from "@inertiajs/react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import React from "react";

export default function RoleCreate({ permissionOptions }) {
    const { data, setData, post, reset, processing, errors } = useForm({
        name: "",
        permissions: [],
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("admin.roles.store"));
    }

    return (
        <>
            <Head title="Role::Create" />
            <Layout>
                <Card title="Create Role">
                    <form onSubmit={handleSubmit}>
                        <CustomInputText
                            label="Name"
                            name="name"
                            value={data.name}
                            onchange={(e) => setData("name", e.target.value)}
                            error={errors.name}
                            onfocus={(e) => errors.name && reset("name")}
                        />
                        <CustomInputSelect
                            label="Permission"
                            name="permissions"
                            value={data.permissions}
                            onchange={(e) => {
                                setData("permissions", e);
                            }}
                            error={errors.permissions}
                            onfocus={(e) =>
                                errors.permissions && clearErrors("permissions")
                            }
                            options={permissionOptions.data}
                            isMulti={true}
                        />
                        <CustomFooterButton
                            saveButton={true}
                            cancelButton={true}
                            cancelRoute={route("admin.roles.index")}
                        />
                    </form>
                </Card>
            </Layout>
        </>
    );
}
