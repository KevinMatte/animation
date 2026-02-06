import type {DrawerPaint, ImageData} from "./CanvasTypes.ts";

class ImageHolder {
    images: Array<{aClass: DrawerPaint, data: ImageData}> = [];
    canvas: HTMLCanvasElement | null = null;

    constructor() {
    }

    // noinspection JSUnusedGlobalSymbols
    setCanvas(canvas: HTMLCanvasElement) {
         this.canvas = canvas;
    }

    getContext2D() {
        if (!this.canvas)
            return null;
        return this.canvas.getContext('2d');
    }

    addImage(aClass: DrawerPaint, data: ImageData) {
        this.images.push({aClass, data});
    }

    // noinspection JSUnusedGlobalSymbols
    paint(){
        for (let i=0; i<this.images.length; i++) {
            const classVar = this.images[i].aClass;
            classVar.paint(this, this.images[i].data);
        }
    }

    static drawLine(ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) {
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
    }
}

export default ImageHolder;