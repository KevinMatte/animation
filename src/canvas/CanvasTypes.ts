import ImageHolder from "./ImageHolder.ts";

type PaintData = Array<Array<number>>;
export {type PaintData};

interface DrawerPaint {
    paint(imageHolder: ImageHolder, data:PaintData): void;
}

export {type DrawerPaint};

type CanvasAny = string | number | object;
export {type CanvasAny};

type ImageData = CanvasAny;
export {type ImageData};