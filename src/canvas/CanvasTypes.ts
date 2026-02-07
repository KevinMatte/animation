type CanvasAny = string | number | object;
export {type CanvasAny};

interface DrawerIfc {
    startDrawing(drawerStateListener: DrawerStateListener): void;
    paint(ctx: CanvasRenderingContext2D): void;
}
export {type DrawerIfc};

interface DrawerStateListener {
    handleComplete(drawerPaint: DrawerIfc): void;
    handleCancel(drawerPaint: DrawerIfc): void;
}
export {type DrawerStateListener};
