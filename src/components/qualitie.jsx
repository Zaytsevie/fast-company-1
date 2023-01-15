import React from "react";

const Qualitie = (qualitieInfo) => {
    return (
        <span
            className={"badge m-1 bg-" + qualitieInfo.color}>
            {qualitieInfo.name}
        </span>
    );
};

export default Qualitie;