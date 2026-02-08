import {useEffect, useId, useRef} from "react";
import {useContext} from "react";
import AppContext from "../AppContext.ts";

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
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (canvasRef.current) {
            appContext?.setCanvas(canvasRef.current);
        }
        return () => {
        }
    }, [canvasRef]);

    return (
        <div id="DrawAreaCanvas" className="fill">
            <canvas id={id} ref={canvasRef} {...props}>Support for HTML Canvas required.</canvas>
        </div>
    );
}