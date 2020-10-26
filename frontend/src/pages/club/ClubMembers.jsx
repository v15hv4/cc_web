import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import API from "../../api/methods";

import ClubNavigation from "./ClubNavigation";
import LoadingIndicator from "../../components/LoadingIndicator";
import NullIndicator from "../../components/NullIndicator";
import MemberItem from "../../components/items/MemberItem";
import Transition from "../../components/TransitionContainer";
import Searchbar from "../../components/Searchbar";

const ClubMembers = (props) => {
    const [members, setMembers] = useState(false);
    const [filteredList, setFilteredList] = useState(false);

    useEffect(() => {
        async function getMembers() {
            const members_res = await API.view("members", {
                club: props.match.params.id || null,
            });
            setMembers(members_res.data.sort((a, b) => b.active_year - a.active_year));
            setFilteredList(members_res.data.sort((a, b) => b.active_year - a.active_year));
        }
        getMembers();
    }, [props.match.params.id]);

    const renderMembers = () => {
        if (!filteredList) return <LoadingIndicator />;
        if (filteredList.length === 0) return <NullIndicator />;
        var prevYear = filteredList[0].active_year;
        filteredList.forEach((role) => {
            if (prevYear !== role.active_year) {
                role["datebreak"] = true;
                prevYear = role.active_year;
            }
        });

        return (
            <Container fluid className="mt-2 mt-md-5">
                <Row>
                    {filteredList.filter((o) => o.active_year === new Date().getFullYear())
                        .length ? (
                        <div className="member-view-year font-weight-bold mt-md-0 mt-3 mb-1 w-100 ml-3">
                            Present
                        </div>
                    ) : null}
                    {filteredList.map((member) => (
                        <>
                            {member.datebreak &&
                            !(member.active_year === new Date().getFullYear()) ? (
                                <div className="member-view-year font-weight-bold mt-3 w-100 ml-3">
                                    {member.active_year}
                                </div>
                            ) : null}
                            <Col sm="6" md="4" lg="3" className="my-3 member-card" key={member.id}>
                                <MemberItem {...member.user_info} role={member.role} />
                            </Col>
                        </>
                    ))}
                </Row>
            </Container>
        );
    };

    return (
        <ClubNavigation match={props.match}>
            <Transition>
                <Row className="mt-4 mt-md-5">
                    <Col className="mx-3">
                        <Searchbar
                            className="w-100"
                            dataList={members}
                            setFilteredList={setFilteredList}
                            searchAttr={(obj) => obj.user_info.name}
                        />
                    </Col>
                </Row>
                {renderMembers()}
            </Transition>
        </ClubNavigation>
    );
};

export default ClubMembers;
