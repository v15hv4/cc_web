import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";

import { formatDateTime } from "../../utils/DateTimeFormatter";

const LogItem = (props) => {
    const messages = {
        0: "created",
        1: "edited",
        2: "deleted",
    };

    const actionMessage = (actionCode) => {
        return <span className={"log-" + actionCode}>{messages[actionCode]}</span>;
    };

    return (
        <>
            {props.datebreak ? (
                <div className="event-card mt-3 mb-2 mx-2">
                    {formatDateTime(props.datetime).date}
                </div>
            ) : null}
            <Card className="event-card">
                <CardBody className="py-2">
                    <Row>
                        <Col xs="4" md="3" className="log-time my-auto">
                            {formatDateTime(props.datetime).time}
                        </Col>
                        <Col className="log-message my-auto">
                            <span className="text-capitalize">{props.creator}</span>{" "}
                            {actionMessage(props.action)} <span>{props.event}</span>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    );
};

export default LogItem;
