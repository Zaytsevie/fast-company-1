import React, { useState } from "react";
import PropTypes from "prop-types";

const BookMark = ({ status }) => {
    const [change, setChange] = useState(status);
    return (
        <span
            className={
                change === false ? "bi bi-star btn" : "bi bi-star-fill btn"
            }
            onClick={() => setChange((change) => !change)}
        ></span>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool.isRequired
};

export default BookMark;
