import React, { useState, useEffect } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";
import { orderBy } from "lodash";

import { validator } from "../../../utils/validator";
import EditUserForm from "../../ui/editUserForm";
import SelectField from "../../common/form/selectField";
import TextareaField from "../../common/form/textareaField";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/MeetingsCard";
import CommentComponents from "../../ui/commentComponents";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);
    const [data, setData] = useState({ users: "", textarea: "" });
    const [comments, setComments] = useState([]);
    const [errors, setErrors] = useState({});

    const params = useParams();
    const { edit } = params;

    const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
        api.users.fetchAll().then((data) => setUsers(data));
        api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
    }, []);

    useEffect(() => {
        validate();
    }, [data]);

    const usersArray = users.map(quaValue => (
        {
            name: quaValue.name,
            value: quaValue._id
        }
    ));

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleRouteEdit = () => {
        history.push(`/users/${userId}/edit`);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        validate();
        console.log(event.target);
        api.comments
            .add(
                {
                    content: data.textarea,
                    created_at: Date.parse(new Date()).toString(),
                    pageId: userId,
                    userId: data.users,
                    _id: Date.parse(new Date()).toString() + data.users
                }
            )
            .then((data) => setComments([...comments, data]));
        setData({ users: "", textarea: "" });
    };

    const remove = (id) => {
        api.comments.remove(id).then((id) => {
            setComments(comments.filter((data) => data._id !== id));
        });
    };

    const validatorConfig = {
        textarea: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            }
        },
        users: {
            isRequired: {
                message: "Выберите пользователя"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            {edit
                ? <EditUserForm />
                : user
                    ? <div className="container ">
                        <div className="row gutters-sm">
                            <div className="col-md-4 mb-3 bg-white rounded">

                                <UserCard
                                    handleRouteEdit={handleRouteEdit}
                                    user={user}
                                />

                                <QualitiesCard
                                    qualities={user.qualities}
                                />

                                <MeetingsCard
                                    completedMeetings={user.completedMeetings}
                                />

                            </div>

                            <div className="col-md-8 bg-white rounded">
                                <div className="card mb-2">
                                    {" "}
                                    <form onSubmit={handleSubmit} className="card-body ">
                                        <h2>Оставить комментарий</h2>

                                        <SelectField
                                            onChange={handleChange}
                                            options={usersArray}
                                            name="users"
                                            value={data.users}
                                            label="Выберите пользователя:"
                                            defaultOption="Выберите пользователя"
                                            error={errors.users}
                                        />

                                        <TextareaField
                                            label={"Сообщение"}
                                            name="textarea"
                                            value={data.textarea}
                                            onChange={handleChange}
                                            error={errors.textarea}
                                            rows="3"
                                        />

                                        <div className="mt-3 d-flex flex-row-reverse">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={!isValid}
                                            >
                                                Опубликовать
                                            </button>
                                        </div>

                                    </form>

                                </div>

                                {sortedComments.length > 0 &&
                                     <div className="card mb-3">
                                         <div className="card-body ">
                                             <h2>Комментарии</h2>
                                             <hr />
                                             {sortedComments.map(comment =>
                                                 <CommentComponents
                                                     key={comment._id}
                                                     users={users}
                                                     comment={comment}
                                                     userId={userId}
                                                     remove={remove}
                                                 />
                                             )}
                                         </div>
                                     </div>
                                }

                            </div>
                        </div>
                    </div>

                    : <div>
                        <span>loading...</span>
                    </div>
            }
        </>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
