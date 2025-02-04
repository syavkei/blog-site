import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import "./About.css";

export default function About({ categories, contributors, posts }) {
    console.log("contributors", contributors);
    const stats = [
        {
            icon: "pi pi-users",
            label: "Contributors",
            value: contributors.length,
        },
        { icon: "pi pi-file", label: "Posts", value: posts.length },
    ];
    return (
        <MainLayout categories={categories}>
            <Head title="About" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        About Blog Site
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We're passionate about sharing knowledge and fostering a
                        community of learners and innovators.
                    </p>
                </div>

                <div className="stats">
                    {stats.map(({ icon, label, value }) => (
                        <div
                            key={label}
                            className="bg-white p-5 rounded-lg shadow-md text-center w-full"
                        >
                            <i
                                className={`h-8 w-8 text-indigo-600 mx-auto mb-4 ${icon}`}
                                style={{ fontSize: "2.5rem" }}
                            ></i>
                            <div className="text-3xl font-bold text-gray-900 mb-2">
                                {value}
                            </div>
                            <div className="text-gray-600">{label}</div>
                        </div>
                    ))}
                </div>

                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Our Team
                    </h2>
                    <div
                        className="contributors"
                        style={{
                            display: "grid",
                            gap: "1rem",
                            gridTemplateColumns: `repeat(${
                                contributors.length < 3
                                    ? contributors.length
                                    : 3
                            }, 1fr)`,
                        }}
                    >
                        {contributors.map((user) => (
                            <div
                                key={user?.name}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                <img
                                    src={
                                        user?.image_path ??
                                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
                                    }
                                    alt={user?.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                        {user?.name}
                                    </h3>
                                    <p className="text-indigo-600 mb-4">
                                        {user?.roles[0]?.name}
                                    </p>
                                    <p className="text-gray-600">{user?.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
