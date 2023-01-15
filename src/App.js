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
        <div>
            <SearchStatus
                length={users.length}
            />
            {users.length > 0 && <Users
                handleDelete={handleDeleteUser}
                users={users}
            />}
        </div>
    );
};

export default App;