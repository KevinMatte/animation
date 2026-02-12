import type {Drawer} from "./Drawer.ts";
import type {DrawType} from "./CanvasTypes.ts";
import {PenDrawer} from "./PenDrawer.ts";
import DrawerGroup from "./DrawerGroup.ts";
import {RectangleDrawer} from "./RectangleDrawer.ts";
import {EllipseDrawer} from "./EllipseDrawer.ts";

class Drawers {
    instances: { [drawType: string]: Drawer } = {};

    getDrawer(drawType: DrawType): Drawer {
        if (drawType in this.instances)
            return this.instances[drawType];
        let instance: Drawer | null = null;
        switch (drawType) {
            case "pen":
                instance = new PenDrawer();
                break;
            case "rectangle":
                instance = new RectangleDrawer();
                break;
            case "ellipse":
                instance = new EllipseDrawer();
                break;
            case "group":
                instance = new DrawerGroup();
                break;
        }
        if (instance === null)
            throw new Error(`DrawType ${drawType} not implemented`);
        this.instances[drawType] = instance;

        return instance;
    }
}
export {Drawers};

