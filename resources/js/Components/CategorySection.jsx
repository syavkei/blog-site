import { Link } from "@inertiajs/react";
import React from "react";

export function CategorySection({ categories }) {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    Categories
                </h2>
                <div className="categories-section">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={`/category/${category.slug}`}
                            className="group relative rounded-lg overflow-hidden shadow-lg"
                        >
                            <img
                                src={
                                    category?.image_path ??
                                    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000"
                                }
                                alt={category.name}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                <h3 className="font-bold mb-1 text-white">
                                    {category.name}
                                </h3>
                                <p className="text-sm text-white/80">
                                    {category.post_count} articles
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
