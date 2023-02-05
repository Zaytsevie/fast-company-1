import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/login";
import MainPage from "./components/mainpage";
import NavBar from "./components/navBar";
import NotFound from "./components/not-found";
import UserInfo from "./components/userInfo";
import Users from "./components/users";

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
