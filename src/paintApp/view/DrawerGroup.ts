import type {DrawerIfc, DrawerStateListener} from "./CanvasTypes.ts";
import Canvas from "./Canvas.ts";
import {bindHandlers} from "../utils/listeners.ts";

class DrawerGroup extends Canvas implements DrawerIfc, DrawerStateListener {
    images: Array<{drawer: DrawerIfc}> = [];
    drawerStateListener?: DrawerStateListener;
    currentDrawer?: DrawerIfc;

    constructor() {
        super();
        bindHandlers(this);
    }

    startDrawer(drawer: DrawerIfc) {
        if (this.canvas) {
            this.currentDrawer = drawer;
            drawer.startDrawing(this, this.canvas, 0, 0);
        }
    }

    // noinspection JSUnusedGlobalSymbols
    setCanvas(canvas: HTMLCanvasElement) {
         this.canvas = canvas;
         if (this.currentDrawer)
             this.currentDrawer.startDrawing(this, this.canvas, 0, 0);
    }

    handleComplete(drawer: DrawerIfc): void {
        this.images.push({drawer: drawer});
        this.currentDrawer = undefined;
    }

    test() {
        const canvas = this.canvas;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // 1. Set the fill style to the desired background color
        ctx.fillStyle = "lightblue";

        // 2. Draw a filled rectangle across the entire canvas
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Subsequent drawing operations will appear on top of this background
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(150, 75, 50, 0, 2 * Math.PI);
        ctx.fill();
    }

    handleCancel(_drawer: DrawerIfc): void {
        this.currentDrawer = undefined;
    }

    // noinspection JSUnusedGlobalSymbols
    paint(ctx: CanvasRenderingContext2D){
        for (let i=0; i<this.images.length; i++) {
            const classVar = this.images[i].drawer;
            classVar.paint(ctx);
        }
    }

    startDrawing(drawerStateListener: DrawerStateListener): void {
        this.drawerStateListener = drawerStateListener;
        this.drawerStateListener.handleComplete(this);
    }
}

export default DrawerGroup;