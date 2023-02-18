import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/login";
import MainPage from "./layouts/mainpage";
import NavBar from "./components/navBar";
import NotFound from "./components/not-found";
import UserInfo from "./components/userInfo";
import Users from "./layouts/users";

function App() {
    return (
        <div>
            <NavBar />

            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/logon" component={Login} />
                <Route path="/users/:usersId?" component={Users} />
                <Route path="/userInfo" component={UserInfo} />
                <Route path={"/404"} component={NotFound} />
                <Redirect to={"404"} />

            </Switch>

        </div>
    );
};

export default App;
