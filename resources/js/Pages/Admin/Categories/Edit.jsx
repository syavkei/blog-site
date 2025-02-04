import CustomFooterButton from "@/Components/CustomFooterButton";
import CustomInputFile from "@/Components/CustomInputFile";
import CustomInputText from "@/Components/CustomInputText";
import Layout from "@/Layouts/layout/layout";
import { Head, useForm } from "@inertiajs/react";
import { Card } from "primereact/card";
import React from "react";

export default function AdminCategoryEdit({ category }) {
    const { data, setData, post, reset, processing, errors } = useForm({
        name: category.name,
        image: null,
        _method: "PUT",
    });

    const handleFileUpload = (e, fieldName) => {
        const file = e.files[0];
        setData(fieldName, file);
    };

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
