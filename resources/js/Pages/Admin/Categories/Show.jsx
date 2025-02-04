import CustomFooterButton from "@/Components/CustomFooterButton";
import CustomInputText from "@/Components/CustomInputText";
import Layout from "@/Layouts/layout/layout";
import { Head } from "@inertiajs/react";
import { Card } from "primereact/card";
import React from "react";

export default function AdminCategoryShow({ category }) {
    return (
        <>
            <Head title="Category::Detail" />
            <Layout>
                <Card title="Detail Category">
                    <form>
                        <CustomInputText
                            label="Name"
                            name="name"
                            value={category.name}
                            disabled
                        />

                        <CustomFooterButton
                            editButton={true}
                            editRoute={route("admin.categories.edit", category)}
                            cancelButton={true}
                            cancelRoute={route("admin.categories.index")}
                        />
                    </form>
                </Card>
            </Layout>
        </>
    );
}
