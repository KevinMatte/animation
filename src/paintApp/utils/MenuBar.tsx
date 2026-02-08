
import type {MenuHandler} from "./MenuTypes.ts"
import {MenuComponent} from "./MenuComponent.tsx";
import AppContext from "../AppContext.ts";
import {useContext} from "react";

export function MenuBar({handler}: {handler: MenuHandler}) {
    const appContext = useContext(AppContext);
    const helpMenu = appContext ? appContext.getHelpMenu() : [];


    return (
        <>
            {Object.values(helpMenu).
            filter(item => !!item).
            filter(item => item.visible === undefined || item.visible).
            map((defn) =>
                (<MenuComponent key={defn.name} defn={defn} handler={handler} />)
            )}
        </>
    );
}