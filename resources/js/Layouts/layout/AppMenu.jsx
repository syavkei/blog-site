import React, { useContext } from "react";
import AppMenuitem from "./AppMenuitem";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";
import { Link, usePage } from "@inertiajs/react";
import { PrimeIcons } from "primereact/api";

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const { auth } = usePage().props;
    const model = [
        {
            label: "Home",
            access: "view_posts",
            items: [
                {
                    label: "Dashboard",
                    icon: "pi pi-fw pi-home",
                    to: route("admin.dashboard"),
                },
            ],
        },
        {
            label: "Blogs",
            access: "view_posts",
            items: [
                {
                    label: "Categories",
                    icon: PrimeIcons.TAGS,
                    to: route("admin.categories.index"),
                },
                {
                    label: "Posts",
                    icon: PrimeIcons.PENCIL,
                    to: route("admin.posts.index"),
                },
            ],
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    const hasAccess = item.access
                        ? auth?.user?.permissions?.find(
                              (permission) => permission?.name === item.access
                          )
                        : true;
                    return !item?.seperator ? (
                        hasAccess && (
                            <AppMenuitem
                                item={item}
                                root={true}
                                index={i}
                                key={item.label}
                                hasAccess={hasAccess}
                                access={item.access}
                            />
                        )
                    ) : (
                        <li className="menu-separator"></li>
                    );
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
