import CustomFooterButton from "@/Components/CustomFooterButton";
import CustomInputEditor from "@/Components/CustomInputEditor";
import CustomInputFile from "@/Components/CustomInputFile";
import CustomInputSelect from "@/Components/CustomInputSelect";
import CustomInputText from "@/Components/CustomInputText";
import Layout from "@/Layouts/layout/layout";
import { Head, useForm } from "@inertiajs/react";
import { Card } from "primereact/card";
import React from "react";

export default function AdminPostEdit({ postData, categoryOptions }) {
    const { data, setData, post, reset, processing, errors } = useForm({
        title: postData.title,
        content: postData.content,
        image: null,
        category_id: postData.category_id,
        _method: "PUT",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("admin.posts.update", postData));
    }

    const selectedCategory = categoryOptions.data.find(
        (category) => category.value === data.category_id
    );

    return (
        <>
            <Head title="Post::Edit" />
            <Layout>
                <Card title="Edit Post">
                    <form onSubmit={handleSubmit}>
                        <CustomInputText
                            label="Title"
                            name="title"
                            value={data.title}
                            onchange={(e) => setData("title", e.target.value)}
                            error={errors.title}
                            onfocus={(e) => errors.title && reset("title")}
                            isMandatory={true}
                        />
                        <CustomInputEditor
                            label="Content"
                            name="content"
                            value={data.content}
                            onchange={(e) => setData("content", e.htmlValue)}
                            error={errors.content}
                            onfocus={(e) => errors.content && reset("title")}
                            setData={setData}
                            formData={data}
                            isMandatory={true}
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

                        <CustomInputSelect
                            label="Category"
                            name="category_id"
                            value={selectedCategory}
                            onchange={(e) => setData("category_id", e.value)}
                            error={errors.category_id}
                            onfocus={(e) =>
                                errors.category_id && clearErrors("category_id")
                            }
                            options={categoryOptions.data}
                            isMandatory={true}
                        />

                        <CustomFooterButton
                            saveButton={true}
                            cancelButton={true}
                            cancelRoute={route("admin.posts.index")}
                        />
                    </form>
                </Card>
            </Layout>
        </>
    );
}
