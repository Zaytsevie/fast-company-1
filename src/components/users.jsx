import React from "react";
import User from "./user";

const Users = (handleDelete, user) => {
    return (
        <>
            <table
                className="table table-striped table-hover align-middle"
            >
                <thead>
                    <tr>
                        <th scope="col" >Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((userInfo) => (
                        <User
                            key={userInfo._id}
                            {...userInfo}
                            onDelete={handleDelete}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Users;