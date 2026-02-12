import DrawerGroup from "./view/DrawerGroup.ts";
import {bindHandlers} from "./utils/listeners.ts";
import type {MenuBarDefn} from "./utils/MenuTypes.ts";

export default class AppController {
    private drawMenu = {
        label: "Draw",
        name: 'file',
        items: [
            {name: 'pen', label: 'Pen'},
            {name: 'rectangle', label: 'Rectangle'},
            {name: 'ellipse', label: 'Ellipse'},
        ]
    };
    helpMenu: MenuBarDefn = {
        "draw": this.drawMenu,
    };

    drawerGroup: DrawerGroup;
    key: number = 0;
    accept? : (key: number) => void;

    constructor() {
        bindHandlers(this);
        this.drawerGroup = new DrawerGroup(true);
    }

    bumpKey() {
        setTimeout(() => {
            this.key ++;
            if (this.accept)
                this.accept(this.key);
        });
    }

    handleMenu(path: string) {
        if (this.drawerGroup) {
            this.drawerGroup.handleMenu(path);
            this.bumpKey();
        }
    }

    waitForKey(accept: (key: number) => void) {
        this.accept = accept;
    }

    getHelpMenu() {
        return this.helpMenu;
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this.drawerGroup.setCanvas(canvas);
    }
}