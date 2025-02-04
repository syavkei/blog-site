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

export default function UserCreate({ roleOptions }) {
    const { data, setData, post, reset, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role_id: "",
        is_approved: 0,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("admin.users.store"));
    }

    const selectedRole = roleOptions.data.find(
        (roleOption) => roleOption.value === data.role_id
    );

    const isApprovedOptions = [
        { label: "Approved", value: "1" },
        { label: "Not Approved", value: "0" },
    ];

    const selectedIsApproved = isApprovedOptions.find(
        (isApprovedOption) => isApprovedOption.value === 0
    );

    return (
        <>
            <Head title="User::Create" />
            <Layout>
                <Card title="Create User">
                    <form onSubmit={handleSubmit}>
                        <CustomInputText
                            label="Name"
                            name="name"
                            value={data.name}
                            onchange={(e) => setData("name", e.target.value)}
                            error={errors.name}
                            onfocus={(e) => errors.name && reset("name")}
                        />
                        <CustomInputText
                            label="Email"
                            name="email"
                            value={data.email}
                            onchange={(e) => setData("email", e.target.value)}
                            error={errors.email}
                            onfocus={(e) => errors.email && reset("email")}
                        />
                        <CustomInputPassword
                            label="Password"
                            name="password"
                            value={data.password}
                            onchange={(e) =>
                                setData("password", e.target.value)
                            }
                            error={errors.password}
                            onfocus={(e) =>
                                errors.password && reset("password")
                            }
                        />
                        <CustomInputPassword
                            label="Password Confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onchange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            error={errors.password_confirmation}
                            onfocus={(e) =>
                                errors.password_confirmation &&
                                reset("password_confirmation")
                            }
                        />
                        <CustomInputSelect
                            label="Role"
                            name="role_id"
                            value={data.role_id}
                            onchange={(e) => {
                                setData("role_id", e.value);
                            }}
                            error={errors.role_id}
                            onfocus={(e) =>
                                errors.role_id && clearErrors("role_id")
                            }
                            options={roleOptions.data}
                        />
                        <CustomInputSelect
                            label="Is Approved"
                            name="is_approved"
                            value={selectedIsApproved}
                            onchange={(e) => {
                                setData("is_approved", e.value);
                            }}
                            error={errors.is_approved}
                            onfocus={(e) =>
                                errors.is_approved && clearErrors("is_approved")
                            }
                            options={isApprovedOptions}
                        />
                        <CustomFooterButton
                            saveButton={true}
                            cancelButton={true}
                            cancelRoute={route("admin.users.index")}
                        />
                    </form>
                </Card>
            </Layout>
        </>
    );
}
