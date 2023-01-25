import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";

function App() {
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    });

    const handleDeleteUser = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    return (
        <>
            {users && (<Users handleDelete={handleDeleteUser} users={users} />)}
        </>
    );
}

export default App;
