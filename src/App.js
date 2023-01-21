import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDeleteUser = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    return (
        <>
            <SearchStatus length={users.length} />
            <Users handleDelete={handleDeleteUser} users={users} />
        </>
    );
}

export default App;
