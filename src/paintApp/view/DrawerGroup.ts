import type {DrawerIfc, DrawerStateListener} from "./CanvasTypes.ts";
import Canvas from "./Canvas.ts";
import {bindHandlers} from "../utils/listeners.ts";
import {PenDrawer, type PenDrawerData} from "./PenDrawer.ts";


type drawType = "none" | "pen";

type DrawerGroupDataItem = {
    drawName: drawType;
    data: PenDrawerData;
}

class Drawers {
    pen: PenDrawer = new PenDrawer();
}

class DrawerGroup extends Canvas implements DrawerIfc, DrawerStateListener {
    drawerStateListener?: DrawerStateListener;
    currentDrawerName: drawType = "none";
    drawers = new Drawers();
    painters = new Drawers();
    images: Array<DrawerGroupDataItem> = [];

    constructor(isTopDrawer: boolean = false) {
        super(isTopDrawer);
        bindHandlers(this);
    }

    handleMenu(path: string) {
        console.log(`Menu Path: ${path}`);
        if (this.canvas) {
            this.currentDrawerName = "pen";
            this.painters.pen.startDrawing(this, this.canvas, 0, 0);
        }
    }

    handleResize(event : UIEvent){
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
         if (this.canvas && this.currentDrawerName !== "none")
             this.drawers.pen.startDrawing(this, this.canvas, 0, 0);
    }

    handleComplete(drawer: DrawerIfc): void {
        if (!drawer.drawerStateListener || !this.canvas)
            return;

        if (this.currentDrawerName === "pen") {
            this.images.push({drawName: "pen", data: this.drawers.pen.getData()});
        }
        if (this.canvas && this.currentDrawerName !== "none")
            this.drawers.pen.startDrawing(this, this.canvas, 0, 0);
    }

    handleCancel(_drawer: DrawerIfc): void {
        if (this.currentDrawerName !== "none") {
            this.drawers.pen.cancel();
            this.currentDrawerName = "none"
        }
    }

    // noinspection JSUnusedGlobalSymbols
    paint(ctx: CanvasRenderingContext2D){
        for (let i=0; i<this.images.length; i++) {
            const image = this.images[i];
            this.painters.pen.paint(ctx, image.data);
        }
    }

    startDrawing(drawerStateListener: DrawerStateListener): void {
        this.drawerStateListener = drawerStateListener;
        this.drawerStateListener.handleComplete(this);
    }
}

export default DrawerGroup;