import Canvas from "../canvas/Canvas.ts";
import type {DrawerIfc, DrawerStateListener} from "./CanvasTypes.ts";

class PenDrawer extends Canvas implements DrawerIfc {
    drawerStateListener?: DrawerStateListener;
    mouseDownEvent: MouseEvent | null = null;
    mouseUpEvent: MouseEvent | null = null;

    isDrawing = false;
    lastPosition = {x: 0, y: 0};
    points: Array<{x: number, y:number}> = [];

    startDrawing(
        drawerStateListener: DrawerStateListener,
        canvas: HTMLCanvasElement, _topX: number, _topY: number
    ): void {
        this.drawerStateListener = drawerStateListener;
        this.setup(canvas);
        if (!this.canvas)
            return;
        this.canvas.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mouseup', this.handleMouseUp);
        this.canvas.addEventListener('mouseout', this.handleMouseUp);
        this.canvas.addEventListener('click', this.handleMouseClick);
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
    }


    paint(ctx: CanvasRenderingContext2D): void
    {
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i=1; i<this.points.length - 1; i++) {
            const point = this.points[i];
            ctx.moveTo(point.x, point.y);
        }
        ctx.stroke();
    }

    destroy() {
        super.destroy();
        if (this.canvas) {
            this.canvas.removeEventListener('mousedown', this.handleMouseDown);
            this.canvas.removeEventListener('mouseup', this.handleMouseUp);
            this.canvas.removeEventListener('mouseout', this.handleMouseUp);
            this.canvas.removeEventListener('click', this.handleMouseClick);
            this.canvas.removeEventListener('mousemove', this.handleMouseMove);
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
        this.points = [{x:this.lastPosition.x, y:this.lastPosition.y}];
    }

    handleMouseUp(event: MouseEvent) {
        this.mouseUpEvent = event;
        this.isDrawing = false;
        if (this.points.length > 1)
            this.drawerStateListener?.handleComplete(this);
        this.points = [];
    }

    handleMouseMove(event: MouseEvent) {
        const ctx = this.canvas?.getContext('2d');
        if (!ctx || !this.isDrawing) return;
        const currentPos = this.getMousePos(event);
        this.points.push({x:currentPos.x, y:currentPos.y});

        ctx.beginPath();
        ctx.moveTo(this.lastPosition.x, this.lastPosition.y);
        ctx.lineTo(currentPos.x, currentPos.y);
        ctx.stroke();

        this.lastPosition = currentPos;
    }
}

export {PenDrawer};