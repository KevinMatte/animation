import type {DrawerData, TwoPointData} from "./CanvasTypes.ts";
import {bindHandlers} from "../utils/listeners.ts";
import {TwoPointDrawer} from "./TwoPointDrawer.ts";


class LineDrawer extends TwoPointDrawer {

    constructor() {
        super();
        bindHandlers(this);
    }

    paint(ctx: CanvasRenderingContext2D, drawerData: DrawerData): void {
        const points = drawerData as TwoPointData;
        const point1 = points.start;
        const point2 = points.end;
        ctx.beginPath();
        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point2.x, point2.y);
        ctx.stroke();
    }
}

export {LineDrawer};