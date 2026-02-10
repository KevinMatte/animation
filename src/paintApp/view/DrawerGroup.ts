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
    cacheCanvas?: HTMLCanvasElement;

    constructor(isTopDrawer: boolean = false) {
        super(isTopDrawer);
        bindHandlers(this);
    }

    handleMenu(path: string) {
        console.log(`Menu Path: ${path}`);
        this.launchDrawer("pen", this.drawers.pen);
    }

    launchDrawer(drawerName: drawType, drawer: DrawerIfc) {
        if (this.canvas) {
            this.currentDrawerName = drawerName;
            this.cacheCanvas = this.copyCanvas(this.canvas, this.cacheCanvas);
            drawer.startDrawing(this, this.canvas, 0, 0);
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
         if (this.currentDrawerName !== "none")
             this.launchDrawer("pen", this.drawers.pen);
    }

    handleComplete(drawer: DrawerIfc, event: MouseEvent): void {
        if (!drawer.drawerStateListener || !this.canvas)
            return;

        if (this.currentDrawerName === "pen") {
            this.images.push({drawName: "pen", data: this.drawers.pen.getData()});
            if (event.shiftKey)
                this.launchDrawer("pen", this.drawers.pen);
        }
    }

    handleCancel(_drawer: DrawerIfc, _event: MouseEvent|KeyboardEvent): void {
        if (this.currentDrawerName !== "none") {
            this.currentDrawerName = "none"
            this.copyCanvas(this.cacheCanvas, this.canvas);
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
        const event = new MouseEvent("mouseup");
        this.drawerStateListener.handleComplete(this, event);
    }
}

export default DrawerGroup;