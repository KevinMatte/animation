import {useEffect, useId, useRef, useState} from "react";
import {useContext} from "react";
import PaintAreaModelContext from "./PaintAreaModelContext.ts";
import DrawerGroup from "./DrawerGroup.ts";

type DrawType = "line" | "circle";

export default function PaintArea({topX, topY, drawType, ...props}:
                          {
                              drawType: DrawType,
                              topX: number,
                              topY: number,
                              [_prop: string]: string | number | object
                          }
) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const id = useId()
    const paintAreaModel = useContext(PaintAreaModelContext);

    function createDrawerGroup() {
        return new DrawerGroup();
    }

    const [drawer, _setDrawer] = useState(createDrawerGroup);

    useEffect(() => {
        if (canvasRef.current && drawer) {
            drawer.setCanvas(canvasRef.current);
            paintAreaModel?.setDrawerGroup(drawer);
        }
        return () => {
            if (drawer)
                drawer.destroy();
        }
    }, [drawer, canvasRef]);

    return (
        <div id="DrawAreaCanvas" className="fill">
            <canvas id={id} ref={canvasRef} {...props}>Support for HTML Canvas required.</canvas>
        </div>
    );
}