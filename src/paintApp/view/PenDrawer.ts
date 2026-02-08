import Canvas from "../view/Canvas.ts";
import type {DrawerIfc, DrawerStateListener} from "./CanvasTypes.ts";
import {bindHandlers} from "../utils/listeners.ts";

class PenDrawer extends Canvas implements DrawerIfc {
    drawerStateListener?: DrawerStateListener;
    mouseDownEvent: MouseEvent | null = null;
    mouseUpEvent: MouseEvent | null = null;

    isDrawing = false;
    lastPosition = {x: 0, y: 0};
    points: Array<{ x: number, y: number }> = [];

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
        this.addListeners();
    }

    private addListeners() {
        if (!this.canvas)
            return;
        this.canvas.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mouseup', this.handleMouseUp);
        this.canvas.addEventListener('mouseout', this.handleMouseUp);
        this.canvas.addEventListener('click', this.handleMouseClick);
    }

    paint(ctx: CanvasRenderingContext2D): void {
        if (this.points.length === 0)
            return;

        for (let i = 0; i < this.points.length - 2; i++) {
            const point1 = this.points[i];
            const point2 = this.points[i+1];
            ctx.beginPath();
            ctx.moveTo(point1.x, point1.y);
            ctx.lineTo(point2.x, point2.y);
            ctx.stroke();
        }
    }

    getReplacement() {
        return new PenDrawer();
    }

    destroy() {
        super.destroy();
        this.removeListeners();
    }

    private removeListeners() {
        if (this.canvas) {
            this.canvas.removeEventListener('mousedown', this.handleMouseDown);
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
        this.mouseDownEvent = event;
        this.mouseUpEvent = null;

        this.isDrawing = true;
        this.lastPosition = this.getMousePos(event);
        this.points = [{x: this.lastPosition.x, y: this.lastPosition.y}];

        if (this.canvas)
            this.canvas.addEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseUp(event: MouseEvent) {
        this.mouseUpEvent = event;
        this.isDrawing = false;
        if (this.points.length > 1)
            this.drawerStateListener?.handleComplete(this);
        else
            this.drawerStateListener?.handleCancel(this);
        if (this.canvas) {
            this.canvas.removeEventListener('mousemove', this.handleMouseMove);
        }
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