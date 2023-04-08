import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, ...rest }) => {
    return (
        <span {...rest}>
            <i className={status ? "bi bi-star-fill btn" : "bi bi-star btn"}></i>
        </span>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool
};

export default BookMark;
