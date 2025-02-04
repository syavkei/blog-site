import { Link } from "@inertiajs/react";
import React from "react";

export default function CustomFooter({ categories }) {
    return (
        // <footer className="p-3 text-center bg-gray-100 fixed bottom-0 left-0 right-0 z-5">
        //     <span>© 2023 My App. All rights reserved.</span>
        // </footer>
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <img
                                alt="logo"
                                src={`/images/logo.png`}
                                className="mr-2"
                                style={{ height: "40px" }}
                            ></img>
                            <span className="text-xl font-bold">Blog Site</span>
                        </div>
                        <p className="text-gray-400">
                            A modern platform for sharing stories, ideas, and
                            knowledge with the world.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-gray-400 hover:text-white"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">
                            Categories
                        </h3>
                        <ul className="space-y-2">
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <Link
                                        href={`/category/${category.slug}`}
                                        className="text-gray-400 hover:text-white"
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">
                            Follow Us
                        </h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://x.com/syavkei"
                                className="text-gray-400 hover:text-white"
                            >
                                <i className="pi pi-twitter h-6 w-6" />
                            </a>
                            <a
                                href="https://facebok.com/syavkei"
                                className="text-gray-400 hover:text-white"
                            >
                                <i className="pi pi-facebook h-6 w-6" />
                            </a>
                            <a
                                href="https://instagram.com/syavkei"
                                className="text-gray-400 hover:text-white"
                            >
                                <i className="pi pi-instagram h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-800 text-center text-gray-400">
                    <p>
                        &copy; {new Date().getFullYear()} Blog Site. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
