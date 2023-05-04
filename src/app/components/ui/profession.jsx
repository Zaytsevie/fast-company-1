import React from "react";
import PropTypes from "prop-types";
import {
    getProfessionsLoadingStatus,
    getProfessoinById
} from "../../store/professions";
import { useSelector } from "react-redux";

const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const prof = useSelector(getProfessoinById(id));

    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
