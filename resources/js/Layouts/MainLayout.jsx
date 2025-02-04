import React, { useState } from "react";
import CustomNavbar from "@/Components/CustomNavbar";
import CustomSidebar from "@/Components/CustomSidebar";
import CustomFooter from "@/Components/CustomFooter";
import { useRef } from "react";
import ToasterCustom from "@/Components/ToasterCustom";

export default function MainLayout({ categories, children }) {
    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ fontFamily: "calibri" }}
        >
            <CustomNavbar categories={categories} />
            <main className="flex-grow">{children}</main>
            <CustomFooter categories={categories} />
        </div>
    );
}
