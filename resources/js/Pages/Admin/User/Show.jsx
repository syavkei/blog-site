import CustomFooterButton from "@/Components/CustomFooterButton";
import CustomIndexToolbar from "@/Components/CustomIndexToolbar";
import CustomInputPassword from "@/Components/CustomInputPassword";
import CustomInputSelect from "@/Components/CustomInputSelect";
import CustomInputText from "@/Components/CustomInputText";
import Layout from "@/Layouts/layout/layout";
import { Head, useForm } from "@inertiajs/react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import React from "react";

export default function UserShow({ user }) {
    const { data, setData, post, reset, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role_id: "",
    });

    return (
        <>
            <Head title="User::Detail" />
            <Layout>
                <Card title="Detail User">
                    <form>
                        <CustomInputText
                            label="Name"
                            value={user.data.name}
                            disabled={true}
                        />
                        <CustomInputText
                            label="Email"
                            value={user.data.email}
                            disabled={true}
                        />
                        <CustomInputText
                            label="Role"
                            value={user.data?.roles[0]?.name}
                            disabled={true}
                        />
                        <CustomInputText
                            label="Is Approved"
                            value={user.data.is_approved}
                            disabled={true}
                        />
                        <CustomFooterButton
                            saveButton={false}
                            editButton={true}
                            editRoute={route("admin.users.edit", {
                                user: user?.data?.id,
                            })}
                            cancelButton={true}
                            cancelRoute={route("admin.users.index")}
                        />
                    </form>
                </Card>
            </Layout>
        </>
    );
}
