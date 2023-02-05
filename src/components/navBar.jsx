import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li className="link">
                    <Link to="/">Main Page</Link>
                </li>
                <li className="link">
                    <Link to="/logon">Login</Link>
                </li>
                <li className="link">
                    <Link to="/users">Users</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
