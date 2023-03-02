import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Login from "./layouts/login";
import MainPage from "./layouts/mainpage";
import NavBar from "./components/ui/navBar";
import NotFound from "./layouts/not-found";
import Users from "./layouts/users";

function App() {
    return (
        <div>
            <NavBar />

            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/logon/:type?" component={Login} />
                <Route path="/users/:userId?/:edit?" component={Users} />
                <Route path={"/404"} component={NotFound} />
                <Redirect to={"404"} />

            </Switch>

        </div>
    );
};

export default App;
