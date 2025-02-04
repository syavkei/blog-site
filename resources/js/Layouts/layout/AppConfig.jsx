import { PrimeReactContext } from "primereact/api";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { RadioButton } from "primereact/radiobutton";
import { Sidebar } from "primereact/sidebar";
import { classNames } from "primereact/utils";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "./context/layoutcontext";
import AppConfigButton from "@/Components/AppConfigButton.jsx";

const AppConfig = (props) => {
    const [scales] = useState([12, 13, 14, 15, 16]);
    const { layoutConfig, setLayoutConfig, layoutState, setLayoutState } =
        useContext(LayoutContext);
    const { setRipple, changeTheme } = useContext(PrimeReactContext);

    const onConfigButtonClick = () => {
        setLayoutState((prevState) => ({
            ...prevState,
            configSidebarVisible: true,
        }));
    };

    const onConfigSidebarHide = () => {
        setLayoutState((prevState) => ({
            ...prevState,
            configSidebarVisible: false,
        }));
    };

    const changeInputStyle = (e) => {
        setLayoutConfig((prevState) => ({ ...prevState, inputStyle: e.value }));
    };

    const changeRipple = (e) => {
        setRipple(e.value);
        setLayoutConfig((prevState) => ({ ...prevState, ripple: e.value }));
    };

    const changeMenuMode = (e) => {
        setLayoutConfig((prevState) => ({ ...prevState, menuMode: e.value }));
    };

    const _changeTheme = (theme, colorScheme) => {
        changeTheme?.(layoutConfig.theme, theme, "theme-css", () => {
            setLayoutConfig((prevState) => ({
                ...prevState,
                theme,
                colorScheme,
            }));
        });
    };

    const decrementScale = () => {
        setLayoutConfig((prevState) => ({
            ...prevState,
            scale: prevState.scale - 1,
        }));
    };

    const incrementScale = () => {
        setLayoutConfig((prevState) => ({
            ...prevState,
            scale: prevState.scale + 1,
        }));
    };

    const applyScale = () => {
        document.documentElement.style.fontSize = layoutConfig.scale + "px";
    };

    useEffect(() => {
        applyScale();
    }, [layoutConfig.scale]);

    return (
        <>
            <button
                className="layout-config-button config-link"
                type="button"
                onClick={onConfigButtonClick}
                style={{ backgroundColor: "#3B82F6" }}
            >
                <i className="pi pi-cog"></i>
            </button>

            <Sidebar
                visible={layoutState.configSidebarVisible}
                onHide={onConfigSidebarHide}
                position="right"
                className="layout-config-sidebar w-20rem"
            >
                {!props.simple && (
                    <>
                        <h5>Scale</h5>
                        <div className="flex align-items-center">
                            <Button
                                icon="pi pi-minus"
                                type="button"
                                onClick={decrementScale}
                                rounded
                                text
                                className="w-2rem h-2rem mr-2"
                                disabled={layoutConfig.scale === scales[0]}
                            ></Button>
                            <div className="flex gap-2 align-items-center">
                                {scales.map((item) => {
                                    return (
                                        <i
                                            className={classNames(
                                                "pi pi-circle-fill",
                                                {
                                                    "text-primary-500":
                                                        item ===
                                                        layoutConfig.scale,
                                                    "text-300":
                                                        item !==
                                                        layoutConfig.scale,
                                                }
                                            )}
                                            key={item}
                                        ></i>
                                    );
                                })}
                            </div>
                            <Button
                                icon="pi pi-plus"
                                type="button"
                                onClick={incrementScale}
                                rounded
                                text
                                className="w-2rem h-2rem ml-2"
                                disabled={
                                    layoutConfig.scale ===
                                    scales[scales.length - 1]
                                }
                            ></Button>
                        </div>

                        <h5>Ripple Effect</h5>
                        <InputSwitch
                            checked={layoutConfig.ripple}
                            onChange={(e) => changeRipple(e)}
                        ></InputSwitch>
                    </>
                )}
                <h5>Default</h5>
                <div className="grid">
                    <AppConfigButton
                        img="/images/layout/themes/tailwind-light.png"
                        imgAlt="Tailwind Light"
                        onClick={() => _changeTheme("tailwind-light", "light")}
                    ></AppConfigButton>
                </div>
                <h5>Bootstrap</h5>
                <div className="grid">
                    <AppConfigButton
                        img="/images/layout/themes/bootstrap4-light-blue.svg"
                        imgAlt="Bootstrap Light"
                        onClick={() =>
                            _changeTheme("bootstrap4-light-blue", "light")
                        }
                    ></AppConfigButton>
                    <AppConfigButton
                        img="/images/layout/themes/bootstrap4-dark-blue.svg"
                        imgAlt="Bootstrap Dark"
                        onClick={() =>
                            _changeTheme("bootstrap4-dark-blue", "dark")
                        }
                    ></AppConfigButton>
                </div>
                <h5>Material Design</h5>
                <div className="grid">
                    <AppConfigButton
                        img="/images/layout/themes/md-light-indigo.svg"
                        imgAlt="Material Light Indigo"
                        onClick={() => _changeTheme("md-light-indigo", "light")}
                    ></AppConfigButton>
                    <AppConfigButton
                        img="/images/layout/themes/md-dark-indigo.svg"
                        imgAlt="Material Dark Indigo"
                        onClick={() => _changeTheme("md-dark-indigo", "dark")}
                    ></AppConfigButton>
                </div>
            </Sidebar>
        </>
    );
};

export default AppConfig;
