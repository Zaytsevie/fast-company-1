import React, { useState } from "react";
import api from "../api";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const renderUsers = () => {
        return (
            users.map((usersInfo) => (
                <tr className="line" key={usersInfo._id}>
                    <td>{usersInfo.name}</td>
                    <td>{usersInfo.qualities.map((qualitie) => (<span key={qualitie._id} className={"badge m-1 bg-" + qualitie.color}>{qualitie.name}</span>))}</td>
                    <td key={usersInfo.profession._id}>{usersInfo.profession.name}</td>
                    <td>{usersInfo.completedMeetings}</td>
                    <td>{usersInfo.rate}</td>
                    <td><button className="btn bg-danger" onClick={() => handleDelete(usersInfo._id)}>Delete</button></td>
                </tr>
            ))
        );
    };

    const handleDelete = (userId) => {
        setUsers((prev) => prev.filter(users => users._id !== userId));
    };

    const renderPhrase = (numbers) => {
        return (
            numbers === 4 ? "человека тусонет с тобой сегодня" :
                numbers === 3 ? "человека тусонет с тобой сегодня" :
                    numbers === 2 ? "человека тусонет с тобой сегодня" :
                        "человек тусонет с тобой сегодня"
        );
    };

    const contentMain = (
        <>
            <h2><span className={users.length === 0 ? "badge bg-danger" : "badge bg-primary"}>{users.length === 0 ? "" : users.length} {renderPhrase(users.length)} </span></h2>
            <table id="mytable" className="table table-striped table-hover align-middle">
                <thead>
                    <tr>
                        <th scope="col" >Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {renderUsers()}
                </tbody>
            </table>
        </>
    );

    const contentZero = <h2><span className="badge bg-danger">Никто не тусонет с тобой</span></h2>;

    return users.length === 0 ? contentZero : contentMain;
};

export default Users;