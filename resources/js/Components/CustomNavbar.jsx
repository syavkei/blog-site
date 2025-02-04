import React from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import { Menubar } from "primereact/menubar";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";

export default function CustomNavbar({ categories }) {
    const { auth } = usePage().props;

    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && (
                <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
                    {item.shortcut}
                </span>
            )}
        </a>
    );
    const items = [
        {
            label: "Home",
            icon: "pi pi-home",
            command: () => {
                router.get("/");
            },
        },
        {
            label: "Categories",
            icon: "pi pi-search",
            items: categories.map((category) => ({
                icon: "pi pi-tag",
                label: category.name,
                command: () => {
                    router.get(`/category/${category.slug}`);
                },
            })),
        },
        {
            label: "About Us",
            icon: "pi pi-envelope",
            command: () => {
                router.get("/about");
            },
        },
        // {
        //     label: "Contact",
        //     icon: "pi pi-envelope",
        // },
    ];

    const start = (
        <img
            alt="logo"
            src={`/images/logo.png`}
            className="mr-2"
            style={{ height: "40px" }}
        ></img>
    );
    const end = (
        // if auth

        <Link href={route("admin.dashboard")}>
            <Button>{auth?.user ? "Dashboard" : "Contribute"}</Button>
        </Link>
    );

    return (
        <div className="card">
            <Menubar
                model={items}
                start={start}
                end={end}
                style={{ zIndex: 1 }}
            />
        </div>
    );
}
