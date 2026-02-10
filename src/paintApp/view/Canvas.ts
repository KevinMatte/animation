import {bindHandlers} from '../utils/listeners.ts';

class Canvas {
    canvas?: HTMLCanvasElement;
    hasCapture = false
    isTopDrawer: boolean;

    constructor(isTopDrawer: boolean = false) {
        bindHandlers(this);
        this.isTopDrawer = isTopDrawer;
    }

    setup(canvasElement: HTMLCanvasElement) {
        if (this.isTopDrawer)
            window.removeEventListener('resize', this.handleResize);
        this.canvas = canvasElement;
        if (this.isTopDrawer) {
            window.addEventListener('resize', this.handleResize);
            this.setCanvasDimensions();
        }
    }

    public getMousePos(event: MouseEvent) {
        if (!this.canvas)
            return {x: 0, y: 0};

        const rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    };

    copyCanvas(srcCanvas?: HTMLCanvasElement, dstCanvas?: HTMLCanvasElement) {

        if (!srcCanvas)
            srcCanvas = this.canvas;
        if (!dstCanvas)
            dstCanvas = document.createElement('canvas');
        if (!srcCanvas)
            return dstCanvas;

        dstCanvas.width = srcCanvas.width;
        dstCanvas.height = srcCanvas.height;
        let ctx = dstCanvas.getContext('2d');
        if (!ctx)
            return dstCanvas;
        ctx.drawImage(
            srcCanvas,
            0, 0, srcCanvas.width, srcCanvas.height,
            0, 0, srcCanvas.width, srcCanvas.height
        );

        return dstCanvas;
    }

    destroy() {
        window.removeEventListener('resize', this.handleResize);
        this.disableCapture();
    }

    setCanvasDimensions() {
        if (!this.canvas)
            return;

        const compStyles = window.getComputedStyle(this.canvas);
        this.canvas.width = parseInt(compStyles.width.substring(0, compStyles.width.length - 2), 10);
        this.canvas.height = parseInt(compStyles.height.substring(0, compStyles.height.length - 2), 10);
        // this.canvas.width = Math.floor(this.canvas.offsetWidth);
        // this.canvas.height = Math.floor(this.canvas.offsetHeight);
    }

    handleResize(_ev: UIEvent) {
        this.setCanvasDimensions();
    }

    handleClickEvent(_ev: MouseEvent) {

    }

    enableCapture() {
        if (!this.canvas) return;
        this.hasCapture = true;
        this.canvas.addEventListener('pointerdown', this.handlePointerCapture);
        this.canvas.addEventListener('pointerup', this.handlePointerRelease);
    }

    disableCapture() {
        if (this.canvas && this.hasCapture) {
            this.canvas.removeEventListener('pointerdown', this.handlePointerCapture);
            this.canvas.removeEventListener('pointerup', this.handlePointerRelease);
            this.hasCapture = false;
        }
    }

    handlePointerCapture(event: PointerEvent) {
        if (!this.canvas) return;
        if (event.buttons === 1) {
            this.canvas.setPointerCapture(event.pointerId);
            this.hasCapture = true;
        } else {
            this.canvas.releasePointerCapture(event.pointerId);
            this.hasCapture = false;
        }
    }

    handlePointerRelease(event: PointerEvent) {
        if (!this.canvas) return;
        if (this.hasCapture) {
            this.canvas.releasePointerCapture(event.pointerId);
            this.hasCapture = false;
        }
    }

    _test = () => {
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

}

export default Canvas;