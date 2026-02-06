
import type {MenuButtonDefn, MenuHandler} from "./MenuTypes.ts"
import {MenuComponent} from "./MenuComponent.tsx";

export function MenuBar({handler}: {handler: MenuHandler}) {
    const defns: Array<MenuButtonDefn> = [
        {
            label: "File",
            name: 'file',
            items: [
                {name: 'profile', label: 'Profile'},
                {name: 'account', label: 'My Account'},
                {name: 'logout', label: 'Logout'},
            ]
        }
    ];

    return (
        <>
            {defns.map((defn) => (<MenuComponent key={defn.name} defn={defn} handler={handler} />))}
        </>
    );
}