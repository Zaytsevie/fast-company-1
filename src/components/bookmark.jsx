import React, { useState } from "react";

const BookMark = (status) => {
    let [change, setChange] = useState(status)
    return (
        status === false
            ? <li
                className={!change ? "bi bi-star btn" : "bi bi-star-fill btn"}
                onClick={() => setChange((change) => !change)} // по заданию изменять данные в fake.api не требуется, сделал пока так.
            ></li>
            : <li
                className={!change ? "bi bi-star-fill btn" : "bi bi-star btn"}
                onClick={() => setChange((change) => !change)}
            ></li>
    );
};
export default BookMark;