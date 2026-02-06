import '@/App.css'
import PaintApp from "./PaintApp.tsx";
import {Button} from '@mui/material';
import Shelf from "./utils/Shelf.tsx";
import {MenuBar} from "./utils/MenuBar.tsx";
import type {MenuHandler} from "./utils/MenuTypes.tsx";
// import * as React from "react";
// import CssBaseline from '@mui/material/CssBaseline';

function App() {
    const queryString = window.location.search;
    const queryParams = new URLSearchParams(queryString);

    const menuHandler: MenuHandler = (path: string) => {
        alert(`MenuPath not handled: ${path}`);
    };


    const back = queryParams.get('back');
    let backElement = <></>;
    if (back) {
        backElement = (
            <Button
                onClick={() => window.location.assign(back)} value=""
                style={{background: "yellow"}}
            >
                Back to playground
            </Button>
        );
    }

    return (
        <>
            {/*<CssBaseline />*/}
            <Shelf direction="column" fill>
                <Shelf>
                    {backElement}: This is WIP. Nothing here to see. :-)
                </Shelf>
                <Shelf direction="row">
                    <MenuBar handler={menuHandler}>
                    </MenuBar>
                </Shelf>
                <Shelf flex="1">
                    <PaintApp/>
                </Shelf>
                {/*</div>*/}
            </Shelf>
        </>
    );
}

export default App
