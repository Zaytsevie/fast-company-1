import React, { useState, useEffect } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import Qualities from "../../ui/qualities";
import EditUserForm from "../../ui/editUserForm";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();

    const params = useParams();
    const { edit } = params;

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    return (
        <>
            {edit
                ? <EditUserForm />
                : user
                    ? <div className="container mt-5 shadow rounded-3 bg-light bg-gradient card text-center w-50">
                        <h1 className="m-2 card-header">{user.name}</h1>
                        <h3 className="m-2">Профессия: { user.profession.name}</h3>
                        <h3 className="m-2">Качества:{<Qualities qualities={user.qualities} />}</h3>
                        <h3 className="m-2">Встретился, раз: {user.completedMeetings}</h3>
                        <h3 className="m-2">Рейтинг: {user.rate}</h3>
                        <Link className="btn btn-primary w-50 mx-auto m-4" to={`/users/${userId}/edit`} >Изменить</Link>
                    </div>
                    : <div>
                        <span>loading...</span>
                    </div>
            }
        </>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string,
    getUsersById: PropTypes.func
};

export default UserPage;
