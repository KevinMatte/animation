import DrawerGroup from "./view/DrawerGroup.ts";
import {PenDrawer} from "./view/PenDrawer.ts";
import {bindHandlers} from "./utils/listeners.ts";
import type {MenuBarDefn} from "./utils/MenuTypes.ts";

export default class AppController {
    private drawMenu = {
        label: "Draw",
        name: 'file',
        items: [
            {name: 'pen', label: 'Pen'},
            {name: 'line', label: 'Line'},
            {name: 'circle', label: 'Circle'},
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
        console.log(`Menu Path: ${path}`);
        if (this.drawerGroup) {
            let drawer = new PenDrawer();
            this.drawerGroup.startDrawer(drawer);
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