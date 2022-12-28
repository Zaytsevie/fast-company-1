import React, { useState } from "react";
import api from "../api";

const Users = () => {
    const [value, setLength] = useState(api.users.fetchAll().length);
    const [text, setText] = useState("человек");

    const renderUsers = () => {
        return (
            api.users.fetchAll().map((user) => (
                <tr className="line" key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.qualities.map((qualitie) => (<span key={qualitie._id} className={"badge m-1 bg-" + qualitie.color}>{qualitie.name}</span>))}</td>
                    <td key={user.profession._id}>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}</td>
                    <td><button className="btn bg-danger" onClick={(event) => deleteTr(event)}>Delete</button></td>
                </tr>
            ))
        )
    };

    const getLengthTable = () => {
        setLength((value) => value - 1);
    };

    const deleteTr = (event) => {
        let target = event.target;
        target.closest(".line").remove();
        getLengthTable();
        if (!document.querySelector(".line")) {
            document.getElementById('mytable').remove();
            document.getElementById('message').remove();
            document.querySelector("h2").insertAdjacentHTML('afterbegin', '<span class="badge bg-danger">Никто  с тобой не тусанет</span>');
        };
        // -----не работают логические операторы && и || ------
        if (value === 5) {
            people()
        } else if (value === 4) {
            people()
        } else if (value === 3) {
            people()
        } else {
            peopleDefoult()
        }
    };
    const people = () => {
        setText((text) => text = "человека");
    };
    const peopleDefoult = () => {
        setText((text) => text = "человек");
    };

    return (
        <>
            <h2><span id="message" className="badge bg-primary">{value} {text} тусонет с тобой сегодня</span></h2>
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
};

export default Users;
