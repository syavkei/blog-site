import React from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

export default function CustomSidebar({ visible, onHide }) {
    const sidebarItems = [
        {
            label: "Dashboard",
            icon: "pi pi-chart-bar",
            command: () => {
                window.location.href = "/dashboard";
            },
        },
        {
            label: "Reports",
            icon: "pi pi-file",
            command: () => {
                window.location.href = "/reports";
            },
        },
        {
            label: "Messages",
            icon: "pi pi-envelope",
            command: () => {
                window.location.href = "/messages";
            },
        },
    ];

    return (
        <Sidebar
            visible={visible}
            showCloseIcon={false}
            closeOnEscape={false}
            maskStyle={{ display: "none" }}
            // onHide={onHide}
            className="h-screen fixed left-0 top-0 z-4" // Fixed on the left
            style={{ width: "250px", top: "60px" }} // Below the navbar
        >
            <div className="flex flex-column gap-2">
                {sidebarItems.map((item, index) => (
                    <Button
                        key={index}
                        label={item.label}
                        icon={item.icon}
                        className="p-button-text p-button-plain"
                        onClick={item.command}
                    />
                ))}
            </div>
        </Sidebar>
    );
}
