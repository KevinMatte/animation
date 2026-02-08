import {useEffect, useId, useRef, useState} from "react";
import ScrollBarCanvas, {type CanvasScrollbarListener} from "../view/ScrollBarCanvas.ts";
import type {CanvasAny} from "../view/CanvasTypes.ts";

// 1. Define the constant values using an object literal and 'as const'
const Orientation = {
    horizontal: "km_spd_col_scroll",
    vertical: "km_spd_row_scroll",
} as const;
export {Orientation}

// 2. Create a union type from the values of the object
type OrientationType = typeof Orientation[keyof typeof Orientation];

function ScrollBar(
    {
        orientation,
        extraClassNames,
        listener,
        ...props
    }:
    {
        orientation: OrientationType,
        extraClassNames: string,
        listener: CanvasScrollbarListener,
        [_prop:string]: CanvasAny;
    }
) {
    const classNames = `${extraClassNames} ${orientation}`;

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const id = useId()

    function createCanvasScrollbar() {
            return new ScrollBarCanvas(
                orientation === Orientation.horizontal,
                listener,
                0,
                100,
            );
    }

    const [canvasScrollbar, _setCanvasScrollbar] = useState(createCanvasScrollbar);

    useEffect(() => {
        if (canvasRef.current) {
            canvasScrollbar.setup(canvasRef.current);
        }
    }, [canvasScrollbar]);

    return (
        <canvas id={id} ref={canvasRef} className={classNames} {...props}></canvas>
    )
}

export default ScrollBar;
