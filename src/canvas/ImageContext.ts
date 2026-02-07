import  DrawerGroup from "./DrawerGroup.ts";
import {createContext} from "react";

const ImageContext = createContext<DrawerGroup|null>(null);

export default ImageContext;