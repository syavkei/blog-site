import { BlogCard } from "@/Components/BlogCard";
import { CategorySection } from "@/Components/CategorySection";
import { HeroSlider } from "@/Components/HeroSlider";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import "./Index.css";

export default function HomepageIndex({ categories, posts, latest }) {
    return (
        <MainLayout categories={categories}>
            <Head title="Homepage" />
            <HeroSlider />
            <section className="p-4 sm:p-6 lg:p-8 mx-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-content-between align-items-center mb-4">
                        <h2 className="text-3xl font-bold text-900">
                            Latest Posts
                        </h2>
                    </div>

                    <div
                        // style={{
                        //     display: "grid",
                        //     gap: "1rem",
                        //     gridTemplateColumns: "repeat(3, 1fr)",
                        // }}
                        className="latest-posts"
                    >
                        {latest.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </section>
            <CategorySection categories={categories} />
        </MainLayout>
    );
}
