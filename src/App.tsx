import '@/App.css'
import AppMain from "./paintApp/AppMain.tsx";
import {Button} from '@mui/material';
import Shelf from "./paintApp/viewx/Shelf.tsx";
import {MenuBar} from "./paintApp/utils/MenuBar.tsx";
import AppController from "./paintApp/AppController.ts";
import {useEffect, useState} from "react";
import AppContext from "./paintApp/AppContext.ts";

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

    function createAppController() {
        return new AppController();
    }
    const [appController, _setAppController] = useState<AppController>(createAppController);
    const [appControllerKey, setAppControllerKey] = useState<number>(0);
    useEffect(() => {
        if (appController) {
            appController.waitForKey(
                key => setAppControllerKey(key)
            );
        }
    }, [appController, appControllerKey]);

    return (
        <>
            {/*<CssBaseline />*/}
            <Shelf direction="column" fill>
                <Shelf>
                    {backElement}: This is WIP. Nothing here to see. :-) {appControllerKey}
                </Shelf>
                <Shelf direction="row">
                    <AppContext key={appControllerKey} value={appController}>
                        <MenuBar handler={appController?.handleMenu}/>
                    </AppContext>
                </Shelf>
                <Shelf flex="1">
                    <AppContext key={appControllerKey} value={appController}>
                        <AppMain/>
                    </AppContext>
                </Shelf>
                {/*</div>*/}
            </Shelf>
        </>
    );
}

export default App
