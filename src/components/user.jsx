import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = (userInfo) => {
    return (
        <>
            <tr
                key={userInfo._id}
            >
                <td>
                    {userInfo.name}
                </td>
                <td>
                    {userInfo.qualities.map((qualitie) => (
                        Qualitie(qualitie.color, qualitie.name, qualitie._id)))}
                </td>
                <td
                    key={userInfo.profession._id}
                >
                    {userInfo.profession.name}
                </td>
                <td>
                    {userInfo.completedMeetings}
                </td>
                <td>
                    {userInfo.rate}
                </td>
                <td>
                    {BookMark(userInfo.bookmark)}
                </td>
                <td>
                    <button
                        className="btn bg-danger"
                        onClick={() => userInfo.onDelete(userInfo._id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        </>
    );
};

export default User;