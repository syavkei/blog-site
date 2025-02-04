import CustomFooterButton from "@/Components/CustomFooterButton";
import CustomInputText from "@/Components/CustomInputText";
import Layout from "@/Layouts/layout/layout";
import { Head, useForm } from "@inertiajs/react";
import { Card } from "primereact/card";
import React from "react";

export default function AdminCategoryEdit({ category }) {
    const { data, setData, post, reset, processing, errors } = useForm({
        name: category.name,
        _method: "PUT",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("admin.categories.update", category));
    }

    return (
        <>
            <Head title="Category::Edit" />
            <Layout>
                <Card title="Edit Category">
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
