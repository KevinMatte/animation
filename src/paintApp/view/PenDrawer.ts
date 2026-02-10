import Canvas from "../view/Canvas.ts";
import type {DrawerIfc, DrawerStateListener} from "./CanvasTypes.ts";
import {bindHandlers} from "../utils/listeners.ts";

type PenDrawerData = Array<{ x: number, y: number }>;
export {type PenDrawerData}


class PenDrawer extends Canvas implements DrawerIfc {
    drawerStateListener?: DrawerStateListener;
    mouseDownEvent: MouseEvent | null = null;
    mouseUpEvent: MouseEvent | null = null;

    isDrawing = false;
    lastPosition = {x: 0, y: 0};
    points: PenDrawerData = [];

    constructor() {
        super();
        bindHandlers(this);
    }

    startDrawing(
        drawerStateListener: DrawerStateListener,
        canvas: HTMLCanvasElement, _topX: number, _topY: number
    ): void {
        this.drawerStateListener = drawerStateListener;
        this.setup(canvas);
        this.removeListeners();
        setTimeout(() => this.addListeners());
    }

    private addListeners() {
        if (!this.canvas)
            return;
        this.canvas.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.canvas.addEventListener('mouseup', this.handleMouseUp);
        this.canvas.addEventListener('mouseout', this.handleMouseUp);
        this.canvas.addEventListener('click', this.handleMouseClick);
    }

    paint(ctx: CanvasRenderingContext2D, points: PenDrawerData): void {
        if (points.length === 0)
            return;

        for (let i = 0; i < points.length - 2; i++) {
            const point1 = points[i];
            const point2 = points[i+1];
            ctx.beginPath();
            ctx.moveTo(point1.x, point1.y);
            ctx.lineTo(point2.x, point2.y);
            ctx.stroke();
        }
    }

    getData(): PenDrawerData {
        return this.points;
    }

    cancel() {
        this.isDrawing = false;
        this.removeListeners();
    }

    destroy() {
        super.destroy();
        this.removeListeners();
    }

    private removeListeners() {
        if (this.canvas) {
            this.canvas.removeEventListener('mousedown', this.handleMouseDown);
            this.canvas.removeEventListener('mousemove', this.handleMouseMove);
            this.canvas.removeEventListener('mouseup', this.handleMouseUp);
            this.canvas.removeEventListener('mouseout', this.handleMouseUp);
            this.canvas.removeEventListener('click', this.handleMouseClick);
        }
    }

    handleMouseClick(_event: MouseEvent) {
        if (!this.mouseDownEvent)
            return;
    }

    handleMouseDown(event: MouseEvent) {
        if (event.button !== 0)
            return;

        this.mouseDownEvent = event;
        this.mouseUpEvent = null;

        this.isDrawing = true;
        this.lastPosition = this.getMousePos(event);
        this.points = [{x: this.lastPosition.x, y: this.lastPosition.y}];
    }

    handleMouseUp(event: MouseEvent) {
        this.mouseUpEvent = event;
        this.isDrawing = false;
        if (this.points.length > 1 && !event.ctrlKey)
            this.drawerStateListener?.handleComplete(this, event);
        else
            this.drawerStateListener?.handleCancel(this, event);
        this.removeListeners();
    }

    handleMouseMove(event: MouseEvent) {
        const ctx = this.canvas?.getContext('2d');
        if (!ctx || !this.isDrawing) return;
        const currentPos = this.getMousePos(event);
        this.points.push({x: currentPos.x, y: currentPos.y});

        ctx.beginPath();
        ctx.moveTo(this.lastPosition.x, this.lastPosition.y);
        ctx.lineTo(currentPos.x, currentPos.y);
        ctx.stroke();

        this.lastPosition = currentPos;
    }
}

export {PenDrawer};