import SafeHtmlRenderer from "@/Components/SafeHtmlRenderer";
import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";
import { Tag } from "primereact/tag";
import React from "react";

export default function HomepagePost({ post, categories }) {
    if (!post) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Post Not Found
                </h1>
                <Link
                    href="/"
                    className="text-indigo-600 hover:text-indigo-700"
                >
                    Return to Home
                </Link>
            </div>
        );
    }

    return (
        <MainLayout categories={categories}>
            <Head title={post.title} />
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <Link
                    href="/"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-8"
                    style={{ whiteSpace: "nowrap" }}
                >
                    <i className="pi pi-arrow-left h-4 w-4 mr-2"></i>
                    Back to Home
                </Link>

                <img
                    src={post.image_path}
                    alt={post.title}
                    className="w-full h-[400px] object-cover rounded-xl mb-8"
                />

                <div className="prose max-w-none">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                        <div className="flex items-center">
                            <span>{post.user.name}</span>
                        </div>
                        <div className="flex items-center">
                            <i className="pi pi-clock h-4 w-4 mr-2"></i>
                            <time>
                                {new Date(post.created_at).toLocaleString()}
                            </time>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link
                                key={post.category.id}
                                href={`/category/${post.category.slug}`}
                                className="text-sm px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200"
                            >
                                {post.category.name}
                            </Link>
                        </div>
                    </div>

                    <div className="text-lg leading-relaxed text-gray-700">
                        <SafeHtmlRenderer htmlContent={post.content} />
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center">
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">
                                {post.author}
                            </h3>
                            <p className="text-gray-600">Contributing Writer</p>
                        </div>
                    </div>
                </div>
            </article>
        </MainLayout>
    );
}
