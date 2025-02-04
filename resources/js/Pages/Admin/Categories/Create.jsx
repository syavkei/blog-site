import CustomFooterButton from "@/Components/CustomFooterButton";
import CustomInputText from "@/Components/CustomInputText";
import Layout from "@/Layouts/layout/layout";
import { Head, useForm } from "@inertiajs/react";
import { Card } from "primereact/card";
import React from "react";

export default function AdminCategoryCreate() {
    const { data, setData, post, reset, processing, errors } = useForm({
        name: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("admin.categories.store"));
    }

    return (
        <>
            <Head title="Category::Create" />
            <Layout>
                <Card title="Create Category">
                    <form onSubmit={handleSubmit}>
                        <CustomInputText
                            label="Name"
                            name="name"
                            value={data.name}
                            onchange={(e) => setData("name", e.target.value)}
                            error={errors.name}
                            onfocus={(e) => errors.name && reset("name")}
                        />

                        <CustomFooterButton
                            saveButton={true}
                            cancelButton={true}
                            cancelRoute={route("admin.categories.index")}
                        />
                    </form>
                </Card>
            </Layout>
        </>
    );
}
