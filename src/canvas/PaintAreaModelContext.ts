import {createContext} from "react";
import type PaintAreaModel from "./PaintAreaModel.ts";

const PaintAreaModelContext = createContext<PaintAreaModel|null>(null);

export default PaintAreaModelContext;