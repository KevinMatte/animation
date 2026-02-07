import type DrawerGroup from "./DrawerGroup.ts";
import {PenDrawer} from "./PenDrawer.ts";
import {bindHandlers} from "../utils/listeners.ts";

export default class PaintAreaModel
{
    drawerGroup?: DrawerGroup;

    constructor() {
        bindHandlers(this);
    }

    handleMenu(path: string) {
        console.log(path);
        if (this.drawerGroup) {
            let drawer = new PenDrawer();
            this.drawerGroup.startDrawer(drawer);
        }
    }

    setDrawerGroup(drawerGroup: DrawerGroup) {
        this.drawerGroup = drawerGroup;
    }
}