import type {DrawerData, DrawerStateListener, TwoPointData} from "./CanvasTypes.ts";
import {bindHandlers} from "../utils/listeners.ts";
import {Drawer} from "./Drawer.ts";



class EllipseDrawer extends Drawer {
    data: TwoPointData = {start: {x: 0, y: 0}, end: {x: 0, y: 0}};
    hasStarted: boolean = false;
    original: HTMLCanvasElement | null = null;

    constructor() {
        super();
        bindHandlers(this);
    }

    startDrawing(
        drawerStateListener: DrawerStateListener,
        canvas: HTMLCanvasElement,
        _original: HTMLCanvasElement,
        _topX: number, _topY: number
    ): void {
        this.drawerStateListener = drawerStateListener;
        this.hasStarted = false;
        this.setup(canvas);
        this.cacheCanvas = _original;
        this.removeListeners();
        setTimeout(() => this.addListeners());
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

    initData() {
        this.data = {start: {x: 0, y: 0}, end: {x: 0, y: 0}};
    }

    addData(currentPos: { x: number; y: number }, ctx: CanvasRenderingContext2D) {
        if (!this.hasStarted) {
            this.hasStarted = true;
            this.data.start = {x: currentPos.x, y: currentPos.y};
        }
        else {
            this.data.end = {x: currentPos.x, y: currentPos.y};
            this.copyCanvas(this.cacheCanvas, this.canvas);
            this.paint(ctx, this.data);
        }
    }

    endData(event: MouseEvent) {
        if (this.data.start.x === this.data.end.x && this.data.end.y === this.data.end.y)
            this.drawerStateListener?.handleCancel(this, event);
        else
            this.drawerStateListener?.handleComplete(this, event);
    }

    getData(): DrawerData {
        return this.data;
    }
}

export {EllipseDrawer};