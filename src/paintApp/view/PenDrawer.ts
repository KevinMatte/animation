import type {DrawerData, DrawerStateListener} from "./CanvasTypes.ts";
import {bindHandlers} from "../utils/listeners.ts";
import {Drawer} from "./Drawer.ts";



class PenDrawer extends Drawer {
    points: DrawerData = [];

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
        this.setup(canvas);
        this.removeListeners();
        setTimeout(() => this.addListeners());
    }
    paint(ctx: CanvasRenderingContext2D, points: DrawerData): void {
        if (points.length === 0)
            return;
        for (let i = 0; i < points.length - 2; i++) {
            const point1 = points[i];
            const point2 = points[i + 1];
            ctx.beginPath();
            ctx.moveTo(point1.x, point1.y);
            ctx.lineTo(point2.x, point2.y);
            ctx.stroke();
        }
    }

    initData() {
        this.points = [{x: this.lastPosition.x, y: this.lastPosition.y}];
    }

    addData(currentPos: { x: number; y: number }, ctx: CanvasRenderingContext2D) {
        this.points.push({x: currentPos.x, y: currentPos.y});

        ctx.beginPath();
        ctx.moveTo(this.lastPosition.x, this.lastPosition.y);
        ctx.lineTo(currentPos.x, currentPos.y);
        ctx.stroke();
    }

    endData(event: MouseEvent) {
        if (this.points.length > 1)
            this.drawerStateListener?.handleComplete(this, event);
        else
            this.drawerStateListener?.handleCancel(this, event);
    }

    getData(): DrawerData {
        return this.points;
    }
}

export {PenDrawer};