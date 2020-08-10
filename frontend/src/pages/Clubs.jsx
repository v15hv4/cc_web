import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "reactstrap";

import API from "../api/methods";
import Searchbar from "../components/Searchbar";
import ClubItem from "../components/items/ClubItem";

const Clubs = (props) => {
    const [clubList, setClubList] = useState(false);
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        async function getClubList() {
            const res = await API.view("clubs", {});
            setClubList(res.data);
            setFilteredList(res.data);
        }

        getClubList();
    }, []);

    if (!clubList) return null;
    return (
        <Container fluid>
            <Container fluid className="actionbar-container p-5 rounded-lg">
                <div className="actionbar-header mx-md-5 mt-0 pt-0">
                    <span className="actionbar-title p-2">Clubs</span>
                </div>
                <Row className="mx-md-5 mt-5">
                    <Searchbar dataList={clubList} setFilteredList={setFilteredList} />
                </Row>
            </Container>

            <Container fluid>
                <Row className="pt-5 mx-md-5">
                    {filteredList.map((club) => (
                        <Col md="6" lg="4" className="py-3">
                            <ClubItem
                                id={club.id}
                                name={club.name}
                                mail={club.mail}
                                link={props.match.url + "/" + club.id}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
};

export default Clubs;
