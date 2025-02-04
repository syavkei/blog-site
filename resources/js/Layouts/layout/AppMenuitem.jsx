import { Ripple } from "primereact/ripple";
import { classNames } from "primereact/utils";
import React, { useEffect, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { MenuContext } from "./context/menucontext";
import { Link } from "@inertiajs/react";

const AppMenuitem = (props) => {
    let url = "";
    try {
        url = route(route().current()); // Might throw an error
    } catch (error) {
        //
    }

    const pathname = url || "";

    const searchParams = "";
    const { activeMenu, setActiveMenu } = useContext(MenuContext);
    const item = props.item;
    const key = props.parentKey
        ? props.parentKey + "-" + props.index
        : String(props.index);
    const isActiveRoute = item.to && pathname === item.to;
    const active = activeMenu === key || activeMenu.startsWith(key + "-");
    const hasAccess = props.hasAccess;

    const onRouteChange = (url) => {
        if (item.to && item.to === url) {
            setActiveMenu(key);
        }
    };

    useEffect(() => {
        if (typeof pathname === "string") onRouteChange(pathname);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, searchParams]);

    const itemClick = (event) => {
        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        // execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        // toggle active state
        if (item.items) setActiveMenu(active ? props.parentKey : key);
        else setActiveMenu(key);
    };

    const subMenu = item.items && item.visible !== false && (
        <CSSTransition
            timeout={{ enter: 1000, exit: 450 }}
            classNames="layout-submenu"
            in={props.root ? true : active}
            key={item.label}
        >
            <ul>
                {props.access === props.hasAccess.name &&
                    item.items.map((child, i) => {
                        return (
                            <AppMenuitem
                                item={child}
                                index={i}
                                className={child.badgeClass}
                                parentKey={key}
                                key={child.label}
                                access={props.access}
                                hasAccess={hasAccess}
                            />
                        );
                    })}
            </ul>
        </CSSTransition>
    );

    return (
        <li
            className={classNames({
                "layout-root-menuitem": props.root,
                "active-menuitem": active,
            })}
        >
            {props.root && item.visible !== false && (
                <div className="layout-menuitem-root-text">{item.label}</div>
            )}
            {(!item.to || item.items) && item.visible !== false ? (
                <a
                    href={item.url}
                    onClick={(e) => itemClick(e)}
                    className={classNames(item.class, "p-ripple")}
                    target={item.target}
                    tabIndex={0}
                >
                    <i
                        className={classNames(
                            "layout-menuitem-icon",
                            item.icon
                        )}
                    />
                    <span className="layout-menuitem-text">{item.label}</span>
                    {item.items && (
                        <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
                    )}
                    <Ripple />
                </a>
            ) : null}

            {item.to && !item.items && item.visible !== false ? (
                <Link
                    href={item.to}
                    replace={item.replaceUrl}
                    target={item.target}
                    onClick={(e) => itemClick(e)}
                    className={classNames(item.class, "p-ripple", {
                        "active-route": isActiveRoute,
                    })}
                    tabIndex={0}
                >
                    <i
                        className={classNames(
                            "layout-menuitem-icon",
                            item.icon
                        )}
                    ></i>
                    <span className="layout-menuitem-text">{item.label}</span>
                    {item.items && (
                        <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
                    )}
                    <Ripple />
                </Link>
            ) : null}

            {subMenu}
        </li>
    );
};

export default AppMenuitem;
