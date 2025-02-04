/* eslint-disable @next/next/no-img-element */

import { classNames } from "primereact/utils";
import React, {
    forwardRef,
    useContext,
    useImperativeHandle,
    useRef,
} from "react";
import { LayoutContext } from "./context/layoutcontext";
import { Link, usePage } from "@inertiajs/react";
import { Avatar } from "primereact/avatar";

const AppTopbar = forwardRef((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } =
        useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current,
    }));

    const { auth } = usePage().props;

    console.log("auth", auth);

    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <img
                    src={`/images/logo.svg`}
                    // width="100.22px"
                    height={"35px"}
                    alt="logo"
                />

                <span>Blog Site</span>
            </Link>

            <button
                ref={menubuttonRef}
                type="button"
                className="p-link layout-menu-button layout-topbar-button"
                onClick={onMenuToggle}
            >
                <i className="pi pi-bars" />
            </button>

            <button
                ref={topbarmenubuttonRef}
                type="button"
                className="p-link layout-topbar-menu-button layout-topbar-button"
                onClick={showProfileSidebar}
            >
                {auth.user.image_path ? (
                    <Avatar image={auth.user.image_path} shape="circle" />
                ) : (
                    <i className="pi pi-user"></i>
                )}
            </button>

            <div
                ref={topbarmenuRef}
                className={classNames("layout-topbar-menu", {
                    "layout-topbar-menu-mobile-active":
                        layoutState.profileSidebarVisible,
                })}
            >
                <Link
                    href={route("admin.profile.edit")}
                    className="p-link layout-topbar-button"
                >
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </Link>
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="p-link layout-topbar-button"
                >
                    <i className="pi pi-lock"></i>
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    );
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
