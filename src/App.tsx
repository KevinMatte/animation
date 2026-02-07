import '@/App.css'
import PaintApp from "./PaintApp.tsx";
import {Button} from '@mui/material';
import Shelf from "./utils/Shelf.tsx";
import {MenuBar} from "./utils/MenuBar.tsx";
import PaintAreaModel from "./canvas/PaintAreaModel.ts";
import {useState} from "react";
import PaintAreaModelContext from "./canvas/PaintAreaModelContext.ts";
// import * as React from "react";
// import CssBaseline from '@mui/material/CssBaseline';

function App() {
    const queryString = window.location.search;
    const queryParams = new URLSearchParams(queryString);

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

    function createPaintAreaModel() {
        return new PaintAreaModel();
    }

    const [imageHolder, _setImageHolder] = useState<PaintAreaModel>(createPaintAreaModel);



    return (
        <>
            {/*<CssBaseline />*/}
            <Shelf direction="column" fill>
                <Shelf>
                    {backElement}: This is WIP. Nothing here to see. :-)
                </Shelf>
                <Shelf direction="row">
                    <MenuBar handler={imageHolder?.handleMenu}>
                    </MenuBar>
                </Shelf>
                <Shelf flex="1">
                    <PaintAreaModelContext value={imageHolder}>
                        <PaintApp/>
                    </PaintAreaModelContext>
                </Shelf>
                {/*</div>*/}
            </Shelf>
        </>
    );
}

export default App
