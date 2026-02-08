import type {DrawerIfc, DrawerStateListener} from "./CanvasTypes.ts";
import Canvas from "./Canvas.ts";
import {bindHandlers} from "../utils/listeners.ts";

class DrawerGroup extends Canvas implements DrawerIfc, DrawerStateListener {
    images: Array<DrawerIfc> = [];
    drawerStateListener?: DrawerStateListener;
    currentDrawer?: DrawerIfc;

    constructor(isTopDrawer: boolean = false) {
        super(isTopDrawer);
        bindHandlers(this);
    }

    getReplacement() {
        return new DrawerGroup();
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

    startDrawer(drawer: DrawerIfc) {
        if (this.canvas) {
            this.currentDrawer = drawer;
            drawer.startDrawing(this, this.canvas, 0, 0);
        }
    }

    // noinspection JSUnusedGlobalSymbols
    setCanvas(canvas: HTMLCanvasElement) {
        if (this.isTopDrawer) {
            this.setup(canvas);
            this.repaint();
        }
         if (this.canvas && this.currentDrawer)
             this.currentDrawer.startDrawing(this, this.canvas, 0, 0);
    }

    handleComplete(drawer: DrawerIfc): void {
        if (!drawer.drawerStateListener || !this.canvas)
            return;

        this.images.push(drawer);
        this.currentDrawer = drawer.getReplacement();
        this.currentDrawer.startDrawing(drawer.drawerStateListener, this.canvas, 0, 0);
        drawer.drawerStateListener = undefined;
    }

    handleCancel(_drawer: DrawerIfc): void {
        this.currentDrawer = undefined;
    }

    // noinspection JSUnusedGlobalSymbols
    paint(ctx: CanvasRenderingContext2D){
        for (let i=0; i<this.images.length; i++) {
            const classVar = this.images[i];
            classVar.paint(ctx);
        }
    }

    startDrawing(drawerStateListener: DrawerStateListener): void {
        this.drawerStateListener = drawerStateListener;
        this.drawerStateListener.handleComplete(this);
    }
}

export default DrawerGroup;