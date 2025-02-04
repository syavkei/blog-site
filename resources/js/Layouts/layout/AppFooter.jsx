import React, { useContext } from "react";

const AppFooter = () => {
    return (
        <div className="layout-footer">
            <span>Copyright ©{new Date().getFullYear()} Blog Site</span>
        </div>
    );
};

export default AppFooter;
