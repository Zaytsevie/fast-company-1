import React from "react";
import PropTypes from "prop-types";

const TextareaField = ({ label, name, value, onChange, error, rows }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getTextareaClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div className="form-group mb-4">
            <label htmlFor={name}>{label}</label>
            <textarea
                rows={rows}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                className={getTextareaClasses()}
                placeholder="Введите сообщение"
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

TextareaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    rows: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

export default TextareaField;
