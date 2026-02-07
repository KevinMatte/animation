import {useEffect, useId, useRef, useState} from "react";
import {PenDrawer} from "./PenDrawer.ts";
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
    const drawerGroup = new DrawerGroup();

    function createDrawer() {

        let drawer: PenDrawer|null;
        switch (drawType) {
            case "line":
                drawer = new PenDrawer();
                break;
            default:
                drawer = null;
                break;
        }
        return drawer;
    }

    const [drawer, _setDrawer] = useState(createDrawer);

    useEffect(() => {
        if (canvasRef.current && drawer) {
            drawer.setProps(canvasRef.current, topX, topY);
        }
        return () => {
            if (drawer)
                drawer.destroy();
        }
    }, [drawer]);

    return (
        <div id="DrawAreaCanvas" className="fill">
            <canvas id={id} ref={canvasRef} {...props}>Support for HTML Canvas required.</canvas>
        </div>
    );
}