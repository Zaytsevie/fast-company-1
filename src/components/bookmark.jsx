import React, { useState } from "react";

const BookMark = (status) => {
    let [change, setChange] = useState(status)
    return (
        <li
            className={change === false ? "bi bi-star btn" : "bi bi-star-fill btn"}
            onClick={() => setChange((change) => !change)} // по заданию изменять данные в fake.api не требуется, сделал пока так.
        ></li>
    );
};
export default BookMark;


