import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import _ from "lodash";

import api from "../../../api";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import UsersTable from "../../ui/usersTable";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import { useUser } from "../../../hooks/useUsers";

const UsersListPage = () => {
    const [data, setData] = useState({ search: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const { users } = useUser();

    const pageSize = 8;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, data.search]);

    const handleChange = ({ target }) => {
        setSelectedProf(undefined);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
        console.log(userId);
    };

    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        // setUsers(newArray);
        console.log(newArray);
    };
    const handleProfessionSelect = (item) => {
        if (data.search !== "") setData({ search: "" });
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filteredUsers = data.search
            ? users.filter(user => user.name.toLowerCase().includes(data.search.toLowerCase()))
            : selectedProf
                ? users.filter(
                    (user) =>
                        JSON.stringify(user.profession) ===
                    JSON.stringify(selectedProf)
                )
                : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <input
                        type="text"
                        name="search"
                        placeholder="Search..."
                        onChange={handleChange}
                        value={data.search}
                    />
                    {count > 0 && (
                        <UsersTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};

UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
