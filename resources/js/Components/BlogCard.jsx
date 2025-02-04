import React from "react";
import { format } from "date-fns";
import { Link } from "@inertiajs/react";

export function BlogCard({ post }) {
    return (
        <article className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 w-full">
            <Link href={`/post/${post.slug}`}>
                <img
                    src={post.image_path}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                />
            </Link>
            <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                    <Link
                        href={`/category/${post.category.slug}`}
                        className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full hover:bg-indigo-200"
                    >
                        {post.category.name}
                    </Link>
                </div>
                <Link href={route("post.show", post.slug)}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-indigo-600">
                        {post.title}
                    </h2>
                </Link>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500">
                    <span>{post.user.name}</span>
                    <span className="mx-2">•</span>
                    <time>
                        {format(new Date(post.created_at), "MMM d, yyyy")}
                    </time>
                </div>
            </div>
        </article>
    );
}
