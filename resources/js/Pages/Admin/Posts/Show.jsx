import CustomFooterButton from "@/Components/CustomFooterButton";
import CustomInputEditor from "@/Components/CustomInputEditor";
import CustomInputSelect from "@/Components/CustomInputSelect";
import CustomInputText from "@/Components/CustomInputText";
import CustomShowSingleFile from "@/Components/CustomShowSingleFile";
import Layout from "@/Layouts/layout/layout";
import { Head } from "@inertiajs/react";
import { Card } from "primereact/card";
import React from "react";

export default function AdminPostShow({ post, categoryOptions }) {
    const selectedCategory = categoryOptions.data.find(
        (category) => category.value === post.category_id
    );
    return (
        <>
            <Head title="Post::Detail" />
            <Layout>
                <Card title="Detail Post">
                    <form>
                        <CustomInputText
                            label="Title"
                            name="title"
                            value={post.title}
                            disabled
                        />
                        <CustomInputEditor
                            label="Content"
                            name="content"
                            value={post.content}
                            isMandatory={true}
                            disabled
                        />

                        <CustomShowSingleFile
                            label="Image"
                            filePath={post.image_path}
                        />

                        <CustomInputSelect
                            label="Category"
                            name="category_id"
                            value={selectedCategory}
                            options={categoryOptions.data}
                            isMandatory={true}
                            disabled
                        />

                        <CustomFooterButton
                            editButton={true}
                            editRoute={route("admin.posts.edit", post)}
                            cancelButton={true}
                            cancelRoute={route("admin.posts.index")}
                        />
                    </form>
                </Card>
            </Layout>
        </>
    );
}
