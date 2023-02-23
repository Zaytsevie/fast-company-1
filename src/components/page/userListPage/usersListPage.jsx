import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import UsersTable from "../../ui/usersTable";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import api from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import _ from "lodash";
import { useParams } from "react-router-dom";
import UserPage from "../userPage/userPage";
import TextField from "../../common/form/textField";

const UsersListPage = () => {
    const params = useParams();
    const userId = params.usersId;

    const [data, setData] = useState({ search: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [users, setUsers] = useState([]);

    const pageSize = 8;

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, data.search]);

    useEffect(() => {
        setUsers(searchFiltered(data.search, users));
    }, [data.search]);

    const handleChange = ({ target }) => {
        setSelectedProf(undefined);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
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

    const searchFiltered = (search, users) => {
        if (search === "") {
            api.users.fetchAll().then((data) => setUsers(data));
        }
        return users.filter(user =>
            user.name.toLowerCase().includes(search.toLowerCase())
        );
    };

    if (users) {
        const filteredUsers = selectedProf
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
            <>{userId
                ? <UserPage id={userId} />
                : <div className="d-flex">
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

                        {count > 0
                            ? <div>
                                <SearchStatus length={count} />
                                <TextField
                                    label=""
                                    placeholder="Поиск..."
                                    name="search"
                                    value={data.search}
                                    onChange={handleChange}
                                />
                                <UsersTable
                                    users={userCrop}
                                    onSort={handleSort}
                                    selectedSort={sortBy}
                                    onDelete={handleDelete}
                                    onToggleBookMark={handleToggleBookMark}
                                />
                            </div>
                            : <div>
                                <span>loading...</span>
                            </div>
                        }
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
            }

            </>
        );
    } return "loading...";
};

UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
