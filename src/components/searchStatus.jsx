import React from "react";

const SearchStatus = ({ length }) => {
    return (
        length === 0
            ? <h2>
                <span
                    className="badge bg-danger"
                >
                    Никто не тусонет с тобой
                </span>
            </h2>
            : <h2>
                <span
                    className={length === 0 ? "badge bg-danger" : "badge bg-primary"}
                >
                    {length === 0 ? "" : length}
                    {length === 4 ? " человека тусонет с тобой сегодня"
                        : length === 3 ? " человека тусонет с тобой сегодня"
                            : length === 2 ? " человека тусонет с тобой сегодня"
                                : " человек тусонет с тобой сегодня"}
                </span>
            </h2>
    );
};

export default SearchStatus;