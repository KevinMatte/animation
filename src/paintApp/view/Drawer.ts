import type {DrawerData, DrawerIfc, DrawerStateListener} from "./CanvasTypes.ts";
import Canvas from "./Canvas.ts";

export abstract class Drawer extends Canvas implements DrawerIfc {
    drawerStateListener?: DrawerStateListener;
    mouseDownEvent: MouseEvent | null = null;
    mouseUpEvent: MouseEvent | null = null;

    isDrawing = false;
    lastPosition = {x: 0, y: 0};

    abstract startDrawing(
        drawerStateListener: DrawerStateListener,
        canvas: HTMLCanvasElement,
        _original: HTMLCanvasElement,
        _topX: number, _topY: number
    ): void;

    addListeners() {
        if (!this.canvas)
            return;
        this.canvas.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.canvas.addEventListener('mouseup', this.handleMouseUp);
        this.canvas.addEventListener('mouseout', this.handleMouseUp);
        this.canvas.addEventListener('click', this.handleMouseClick);
    }

    abstract paint(ctx: CanvasRenderingContext2D, points: DrawerData): void;

    abstract getData(): DrawerData;

    removeListeners() {
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
        this.canvas?.focus();

        this.mouseDownEvent = event;
        this.mouseUpEvent = null;

        this.isDrawing = true;
        this.lastPosition = this.getMousePos(event);
        this.initData();
    }

    abstract initData(): void;
    cancelDrawing(): void {
        this.isDrawing = false;
        this.removeListeners();
    }

    handleMouseUp(event: MouseEvent) {
        this.mouseUpEvent = event;
        this.isDrawing = false;
        this.endData(event);
        this.removeListeners();
    }

    abstract endData(event: MouseEvent): void;

    handleMouseMove(event: MouseEvent) {
        if (!this.canvas)
            return;
        const ctx: CanvasRenderingContext2D | null = this.canvas.getContext('2d');
        if (!ctx || !this.isDrawing) return;
        const currentPos = this.getMousePos(event);
        this.addData(currentPos, ctx);

        this.lastPosition = currentPos;
    }

    abstract addData(currentPos: { x: number; y: number }, ctx: CanvasRenderingContext2D): void;
}