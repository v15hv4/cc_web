import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import AdminTabBar from "./AdminTabBar";
import Searchbar from "../../components/Searchbar";
import NewButton from "../../components/buttons/NewButton";
import Transition from "../../components/TransitionContainer";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";
import NewUserModal from "../../components/NewUserModal";
import UserItem from "../../components/items/UserItem";

const AdminUsers = () => {
    const [userList, setUserList] = useState(false);
    const [filteredList, setFilteredList] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        async function getUserList() {
            const res = await API.view("coordinators", {});
            setUserList(res.data);
            setFilteredList(res.data);
        }

        getUserList();
    }, []);

    const toggleModal = () => {
        setModal(!modal);
    };

    const renderUsers = () => {
        if (!filteredList) return <LoadingIndicator />;
        if (filteredList.length === 0) return <NullIndicator />;
        return (
            <Container fluid className="mt-2 mt-md-5">
                <Row>
                    {filteredList.map((user) => {
                        return (
                            <Col xs="6" md="4" lg="3" className="my-3 user-card" key={user.id}>
                                <UserItem modifiable {...user} />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        );
    };

    return (
        <>
            <AdminTabBar />
            <NewUserModal modal={modal} toggleModal={toggleModal} />
            <Transition>
                <Container fluid className="actionbar-container rounded-lg">
                    <Row>
                        <Col
                            md="6"
                            className="d-flex flex-row justify-content-between justify-content-md-start"
                        >
                            <span className="actionbar-title ml-md-2">Users</span>
                            <NewButton onClick={toggleModal} text="user" />
                        </Col>
                        <Col className="my-4 my-md-auto">
                            <Searchbar
                                className="w-100"
                                dataList={userList}
                                setFilteredList={setFilteredList}
                            />
                        </Col>
                    </Row>
                </Container>
                {renderUsers()}
            </Transition>
        </>
    );
};

export default AdminUsers;
