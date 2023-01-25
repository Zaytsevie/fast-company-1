import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ userInfo, onDelete }) => {
    return (
        <>
            <tr key={userInfo._id}>
                <td>{userInfo.name}</td>
                <td>
                    {userInfo.qualities.map((qualitie) => (
                        <Qualitie
                            key={qualitie._id}
                            color={qualitie.color}
                            name={qualitie.name}
                        />
                    ))}
                </td>
                <td>{userInfo.profession.name}</td>
                <td>{userInfo.completedMeetings}</td>
                <td>{userInfo.rate} /5</td>
                <td>
                    <BookMark status={userInfo.bookmark} />
                </td>
                <td>
                    <button
                        className="btn bg-danger"
                        onClick={() => onDelete(userInfo._id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        </>
    );
};

User.propTypes = {
    userInfo: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default User;
