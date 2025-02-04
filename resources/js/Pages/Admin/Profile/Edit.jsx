import CustomFooterButton from "@/Components/CustomFooterButton";
import CustomIndexToolbar from "@/Components/CustomIndexToolbar";
import CustomInputFile from "@/Components/CustomInputFile";
import CustomInputPassword from "@/Components/CustomInputPassword";
import CustomInputSelect from "@/Components/CustomInputSelect";
import CustomInputText from "@/Components/CustomInputText";
import Layout from "@/Layouts/layout/layout";
import { Head, useForm } from "@inertiajs/react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import React from "react";

export default function ProfileEdit({ user }) {
    console.log("user", user);
    const { data, setData, post, reset, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: null,
        password_confirmation: null,
        _method: "put",
        image: null,
    });

    const handleFileUpload = (e, fieldName) => {
        const file = e.files[0];
        setData(fieldName, file);
    };

    function handleSubmit(e) {
        e.preventDefault();
        post(route("admin.profile.update", { user: user }));
    }

    return (
        <>
            <Head title="Profile::Edit" />
            <Layout>
                <Card title="Edit Profile">
                    <form onSubmit={handleSubmit}>
                        <CustomInputText
                            label="Name"
                            name="name"
                            value={data.name}
                            onchange={(e) => setData("name", e.target.value)}
                            error={errors.name}
                            onfocus={(e) => errors.name && reset("name")}
                        />
                        <CustomInputFile
                            label="Image"
                            name="image"
                            onchange={(e) => handleFileUpload(e, "image")}
                            error={errors.image}
                            onfocus={(e) => errors.image && reset("image")}
                            accept=".jpg,.png,.jpeg"
                            chooseLabel="Choose Post Image"
                            mode="advanced"
                            auto={true}
                            isMultiple={false}
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
