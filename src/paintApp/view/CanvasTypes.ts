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

type Point = { x: number, y: number }
type PenDrawerData = Array<Point>;
export {type PenDrawerData}

type TwoPointData = { start: Point; end: Point; };
export {type TwoPointData}

type DrawType = "none" | "pen" | "group" | "rectangle" | "ellipse";
export {type DrawType};

type DrawerGroupDataItem = {
    drawType: DrawType;
    data: DrawerData;
}

type DrawerGroupData = Array<DrawerGroupDataItem>;
export {type DrawerGroupData};

type DrawerData = PenDrawerData | DrawerGroupData | TwoPointData;
export {type DrawerData}



