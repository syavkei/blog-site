import { BlogCard } from "@/Components/BlogCard";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Category({ category, categories }) {
    return (
        <MainLayout categories={categories}>
            <Head title={category.name} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 capitalize">
                        {category.name}
                    </h1>
                    <p className="text-lg text-gray-600">
                        Explore our latest articles about {category.name}
                    </p>
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "1rem",
                        justifyContent: "center",
                    }}
                >
                    {category.posts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

                {category.posts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">
                            No posts found in this category.
                        </p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
