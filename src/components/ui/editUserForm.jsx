import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import PropTypes from "prop-types";

import api from "../../api";
import { validator } from "../../utils/validator";

import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";

const EditUserForm = () => {
    const params = useParams();
    const { userId } = params;
    const [user, setUser] = useState();
    const [errors, setErrors] = useState({});
    const [professions, setProfession] = useState({});
    const [qualities, setQualities] = useState([]);
    const [data, setData] = useState(
        {
            name: "",
            email: "",
            profession: "",
            sex: "male",
            qualities: []
        }
    );
    const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    useEffect(() => {
        if (user) {
            setData({
                name: user.name,
                email: user.email,
                profession: user.profession._id,
                sex: user.sex,
                qualities: user.qualities
            });
        }
    }, [user]);

    useEffect(() => {
        validate();
    }, [data]);

    const qualitiesDefaultArray = () => {
        return user.qualities.map(quaValue => (
            {
                label: quaValue.name,
                value: quaValue._id
            }
        ));
    };

    const professionReturnInfo = () => {
        const profIndex1 = Object.values(professions).findIndex((prof) => prof._id === data.profession);
        // const profIndex2 = Object.values(professions).findIndex((prof) => prof.name === data.profession);
        return Object.values(professions)[profIndex1];
        // || Object.values(professions)[profIndex2];
    };

    const qualitiesReturnInfo = () =>
        data.qualities === user.qualities
            ? data.qualities
            : data.qualities.map(quaValue => (
                Object.values(qualities).find((qual) => qual._id === quaValue.value)
            ));

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        api.users.update(userId, {
            name: data.name,
            email: data.email,
            profession: professionReturnInfo(),
            sex: data.sex,
            qualities: qualitiesReturnInfo()
        });
        history.push(`/users/${userId}`);
        console.log(data);
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен не корректно"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {user
                        ? <form
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выберите вашу профессию"
                                defaultOption="Chooes..."
                                options={professions}
                                value={data.profession}
                                error={errors.profession}
                                onChange={handleChange}
                                name="profession"
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                label="Выберите ваши качетва"
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={qualitiesDefaultArray()}
                                name="qualities"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto">
                                Изменить
                            </button>

                        </form>
                        : <span>Loading...</span>}
                </div>
            </div>
        </div>
    );
};

EditUserForm.propTypes = {
    userId: PropTypes.string
};

export default EditUserForm;
