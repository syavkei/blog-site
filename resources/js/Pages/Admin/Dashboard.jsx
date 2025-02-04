import Layout from "@/Layouts/layout/layout";
import { Head } from "@inertiajs/react";
import { Card } from "primereact/card";

export default function Dashboard({
    auth,
    posts,
    populars,
    contributors,
    total_views,
}) {
    const stats = [
        {
            icon: "pi pi-file",
            label: "Total Posts",
            value: posts.length,
        },
        {
            icon: "pi pi-users",
            label: "Total Contributors",
            value: contributors.length,
        },
        {
            icon: "pi pi-eye",
            label: "Post Views",
            value: total_views,
        },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <Layout>
                <Card className="p-1">
                    <div className="space-y-8">
                        <div className="grid gap-6">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="bg-white rounded-lg shadow-md p-6 col"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                {stat.label}
                                            </p>
                                            <p className="text-2xl font-semibold mt-1">
                                                {stat.value}
                                            </p>
                                        </div>
                                        <div className="bg-indigo-50 p-3 rounded-lg">
                                            <i
                                                className={`${stat.icon} h-6 w-6 text-indigo-600`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-lg shadow-md">
                            <div className="p-6 border-b">
                                <h2 className="text-lg font-semibold">
                                    Recent Posts
                                </h2>
                            </div>
                            <div className="divide-y">
                                {populars.map((post) => (
                                    <div
                                        key={post.id}
                                        className="p-4 flex items-center justify-between"
                                    >
                                        <div>
                                            <h3 className="text-sm">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Published on{" "}
                                                {new Date(
                                                    post.created_at
                                                ).toLocaleDateString()}{" "}
                                                by {post.user.name}
                                            </p>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <i className="pi pi-eye h-4 w-4 mr-1" />
                                            {post.views.toLocaleString()} views
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </Layout>
        </>
    );
}
