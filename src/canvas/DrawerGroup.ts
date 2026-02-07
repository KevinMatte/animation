import type {DrawerIfc, DrawerStateListener} from "./CanvasTypes.ts";

class DrawerGroup  implements DrawerIfc, DrawerStateListener {
    images: Array<{drawer: DrawerIfc}> = [];
    canvas?: HTMLCanvasElement;
    drawerStateListener?: DrawerStateListener;
    currentDrawer?: DrawerIfc;

    constructor() {
    }

    // noinspection JSUnusedGlobalSymbols
    setCanvas(canvas: HTMLCanvasElement) {
         this.canvas = canvas;
    }

    handleComplete(drawer: DrawerIfc): void {
        this.images.push({drawer: drawer});
        this.currentDrawer = undefined;
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