import React, { useState, useEffect } from "react";
import api from "../api";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import QualitiesList from "./qualitiesList";

const UserInfo = ({ id }) => {
    const [user, setUser] = useState([]);

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
                ? <div className="container mt-5 shadow rounded-3 bg-light bg-gradient card text-center">
                    <h1 className="m-2 card-header">{user.name}</h1>
                    <h3 className="m-2">Профессия: { user.profession.name}</h3>
                    <h3 className="m-2">Качества:{<QualitiesList qualities={user.qualities} />}</h3>
                    <h3 className="m-2">Встретился, раз: {user.completedMeetings}</h3>
                    <h3 className="m-2">Рейтинг: {user.rate}</h3>
                    <button onClick={handleReturnAllUsers} className="btn btn-primary w-50 mx-auto m-4">Все пользователи</button>
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
