import type {DrawerData, TwoPointData} from "./CanvasTypes.ts";
import {bindHandlers} from "../utils/listeners.ts";
import {TwoPointDrawer} from "./TwoPointDrawer.ts";



class EllipseDrawer extends TwoPointDrawer {

    constructor() {
        super();
        bindHandlers(this);
    }

    paint(ctx: CanvasRenderingContext2D, drawerData: DrawerData): void {
        const points = drawerData as TwoPointData;
        const point1 = points.start;
        const point2 = points.end;
        let radiusX = (point2.x - point1.x) / 2;
        const centerX = point1.x + radiusX;
        let radiusY = (point2.y - point1.y) / 2;
        const centerY = point1.y + radiusY;

        ctx.beginPath();
        ctx.ellipse(centerX, centerY, Math.abs(radiusX), Math.abs(radiusY), 0, 0, Math.PI * 2);
        ctx.stroke();
    }
}

export {EllipseDrawer};