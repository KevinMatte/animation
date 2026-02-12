import type {
    DrawerData,
    DrawerGroupData,
    DrawerIfc,
    DrawerStateListener,
    DrawType,
} from "./CanvasTypes.ts";
import {Drawer} from "./Drawer.ts";
import {bindHandlers} from "../utils/listeners.ts";
import {Drawers} from "./Drawers.ts";

class DrawerGroup extends Drawer implements DrawerStateListener {
    currentDrawerType: DrawType = "none";
    drawers = new Drawers();
    painters = new Drawers();
    images: DrawerGroupData = [];

    constructor(isTopDrawer: boolean = false) {
        super(isTopDrawer);
        bindHandlers(this);
    }

    handleMenu(path: string) {
        console.log(`Menu Path: ${path}`);
        const lastSlash = path.lastIndexOf("/");
        const drawType = path.substring(lastSlash + 1, path.length);
        this.launchDrawer(drawType as DrawType);
    }

    launchDrawer(drawType: DrawType) {
        if (this.canvas) {
            let drawer = this.drawers.getDrawer(drawType);
            this.currentDrawerType = drawType;
            this.cacheCanvas = this.copyCanvas(this.canvas, this.cacheCanvas);
            drawer.startDrawing(this, this.canvas, this.cacheCanvas, 0, 0);
            window.addEventListener('keydown', this.handleKeyDown);
        }
    }

    handleResize(event: UIEvent) {
        super.handleResize(event);
        this.repaint();
    }

    private repaint() {
        if (this.canvas) {
            const ctx = this.canvas.getContext("2d");
            if (ctx)
                this.paint(ctx);
        }
    }

    // noinspection JSUnusedGlobalSymbols
    setCanvas(canvas: HTMLCanvasElement) {
        if (this.isTopDrawer) {
            this.setup(canvas);
            this.repaint();
        }
        if (this.currentDrawerType !== "none")
            this.launchDrawer(this.currentDrawerType);
    }

    handleComplete(drawer: DrawerIfc, event: MouseEvent): void {
        if (!drawer.drawerStateListener || !this.canvas)
            return;

        if (this.currentDrawerType !== "none") {
            this.images.push({drawType: this.currentDrawerType, data: this.drawers.getDrawer(this.currentDrawerType).getData()});
            if (event.shiftKey)
                this.launchDrawer(this.currentDrawerType);
            else
                window.removeEventListener('keydown', this.handleKeyDown);
        } else
            window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleCancel(_drawer: DrawerIfc, _event: KeyboardEvent): void {
        if (this.currentDrawerType !== "none") {
            this.currentDrawerType = "none"
            this.copyCanvas(this.cacheCanvas, this.canvas);
        }

        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Escape' && this.currentDrawerType !== "none") {
            this.cancelDrawing();
        }
    }

    cancelDrawing(): void {
        this.drawers.getDrawer(this.currentDrawerType).cancelDrawing();
        this.currentDrawerType = "none"
        this.copyCanvas(this.cacheCanvas, this.canvas);
    }

    // noinspection JSUnusedGlobalSymbols
    paint(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < this.images.length; i++) {
            const image = this.images[i];
            this.painters.getDrawer(image.drawType).paint(ctx, image.data);
        }
    }

    startDrawing(
        drawerStateListener: DrawerStateListener,
        _original: HTMLCanvasElement): void {
        this.drawerStateListener = drawerStateListener;
        const event = new MouseEvent("mouseup");
        this.drawerStateListener.handleComplete(this, event);
    }

    /* TBD: ---- *Data() methods when grouping is implemented. ---- */

    getData(): DrawerData {
        return this.images;
    }

    initData(): void {
        this.images = [];
    }

    endData(_event: MouseEvent): void {
    }

    addData(_currentPos: { x: number; y: number; }, _ctx: CanvasRenderingContext2D): void {
    }
}

export default DrawerGroup;

