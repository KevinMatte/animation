import * as React from "react";
import type {ReactNode} from "react";

type MenuTypeDefn = {
    label: string;
    name: string;
};
type MenuButtonDefn = {
    name: string;
    label: string;
    items: Array<MenuTypeDefn>;
};
type ButtonEvent = React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLLIElement>;
type MenuHandler = (path: string) => void;
export type {MenuHandler, MenuButtonDefn, ButtonEvent};

type MenuAny = string | number | object | undefined | ReactNode | boolean;
export {type MenuAny};

