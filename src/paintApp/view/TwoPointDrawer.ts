import type {DrawerData, DrawerStateListener, TwoPointData} from "./CanvasTypes.ts";
import {Drawer} from "./Drawer.ts";

export abstract class TwoPointDrawer extends Drawer {
    data: TwoPointData = {start: {x: 0, y: 0}, end: {x: 0, y: 0}};
    hasStarted: boolean = false;

    startDrawing(
        drawerStateListener: DrawerStateListener,
        canvas: HTMLCanvasElement,
        cacheCanvas: HTMLCanvasElement,
        _topX: number, _topY: number
    ): void {
        this.drawerStateListener = drawerStateListener;
        this.hasStarted = false;
        this.setup(canvas);
        this.cacheCanvas = cacheCanvas;
        this.removeListeners();
        setTimeout(() => this.addListeners());
    }

    abstract paint(ctx: CanvasRenderingContext2D, drawerData: DrawerData): void;

    initData() {
        this.data = {start: {x: 0, y: 0}, end: {x: 0, y: 0}};
    }

    addData(currentPos: { x: number; y: number }, ctx: CanvasRenderingContext2D) {
        if (!this.hasStarted) {
            this.hasStarted = true;
            this.data.start = {x: currentPos.x, y: currentPos.y};
        } else {
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