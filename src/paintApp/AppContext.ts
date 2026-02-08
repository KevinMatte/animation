import {createContext} from "react";
import type AppController from "./AppController.ts";

const AppContext = createContext<AppController|null>(null);

export default AppContext;