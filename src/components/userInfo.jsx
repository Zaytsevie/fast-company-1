import React, { useState, useEffect } from "react";
import api from "../api";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import QualitiesList from "./qualitiesList";

const UserInfo = ({ id }) => {
    const [user, setUser] = useState();

    const history = useHistory();

    const handleReturnAllUsers = () => {
        history.push("/users");
    };

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    });

    return (
        <>
            {user
                ? <div>
                    <h1>{user.name}</h1>
                    <h3>Профессия: { user.profession.name}</h3>
                    <h3>Качества:{<QualitiesList qualities={user.qualities} />}</h3>
                    <h3>Встретился, раз: {user.completedMeetings}</h3>
                    <h3>Рейтинг: {user.rate}</h3>
                    <button onClick={handleReturnAllUsers}>Все пользователи</button>
                </div>
                : <div>
                    <span>loading...</span>
                </div>
            }
        </>
    );
};

UserInfo.propTypes = {
    id: PropTypes.string,
    getUsersById: PropTypes.func
};

export default UserInfo;
