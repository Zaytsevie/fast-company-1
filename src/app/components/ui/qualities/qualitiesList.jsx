import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";
import Quality from "./quality";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQualities } = useQualities();

    if (!isLoading) {
        return (
            qualities.map((qual) => (
                <Quality key={qual} {...getQualities(qual)} />
            ))
        );
    } else return "Loading...";
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
