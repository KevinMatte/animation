type CanvasAny = string | number | object;
export {type CanvasAny};

interface DrawerIfc {
    drawerStateListener?: DrawerStateListener;

    startDrawing(
        drawerStateListener: DrawerStateListener,
        canvas: HTMLCanvasElement,
        original: HTMLCanvasElement,
        _topX: number,
        _topY: number,

    ): void;

    cancelDrawing(): void;
}
export {type DrawerIfc};


interface DrawerStateListener {
    handleComplete(drawerPaint: DrawerIfc, event: MouseEvent): void;
    handleCancel(drawerPaint: DrawerIfc, event: MouseEvent|KeyboardEvent): void;
}
export {type DrawerStateListener};

type PenDrawerData = Array<{ x: number, y: number }>;
export {type PenDrawerData}
type DrawerData = PenDrawerData;
export {type DrawerData}

