import { useEffect, createContext } from "react";
import { Route, Switch } from "react-router-dom";
import { ManageSession } from "api/session";

import * as Public from "pages/public";

export const SessionContext = createContext();

const App = () => {
    const [session, fetchSession, dispatchSession] = ManageSession();
    useEffect(() => fetchSession(), []); // eslint-disable-line

    console.log(session);

    return (
        <SessionContext.Provider value={{ session, dispatchSession }}>
            <Switch>
                <Route exact path="/">
                    <Public.Home />
                </Route>
                <Route path="/clubs">
                    <Public.Clubs />
                </Route>
                <Route path="/calendar">
                    <Public.Calendar />
                </Route>
            </Switch>
        </SessionContext.Provider>
    );
};

export default App;
