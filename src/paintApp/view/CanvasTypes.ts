type CanvasAny = string | number | object;
export {type CanvasAny};

interface DrawerIfc {
    drawerStateListener?: DrawerStateListener;

    startDrawing(
        drawerStateListener: DrawerStateListener,
        canvas: HTMLCanvasElement, _topX: number, _topY: number
    ): void;
}
export {type DrawerIfc};


interface DrawerStateListener {
    handleComplete(drawerPaint: DrawerIfc, event: MouseEvent): void;
    handleCancel(drawerPaint: DrawerIfc, event: MouseEvent): void;
}
export {type DrawerStateListener};
