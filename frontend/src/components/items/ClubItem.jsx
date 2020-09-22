import React, { useState } from "react";
import { Card, CardBody, CardFooter, Input } from "reactstrap";
import { Link } from "react-router-dom";

import EditButton from "../../components/buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import EditClubModal from "../../components/EditClubModal";
import DeleteClubModal from "../DeleteClubModal";

const ClubItem = (props) => {
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const toggleEditModal = () => {
        setEditModal(!editModal);
    };

    const toggleDeleteModal = () => {
        setDeleteModal(!deleteModal);
    };

    return (
        <Card className="dash-card club-card elevate flex-fill">
            <EditClubModal modal={editModal} toggleModal={toggleEditModal} id={props.id} />
            <DeleteClubModal
                modal={deleteModal}
                toggleModal={toggleDeleteModal}
                id={props.id}
                name={props.name}
            />
            <CardBody tag={Link} to={props.link} className="link-card d-flex">
                <div className={"club-name " + (props.modifiable ? null : "text-center m-auto")}>
                    {props.name}
                </div>
            </CardBody>
            {props.modifiable ? (
                <CardFooter className="text-right p-2">
                    <div className="club-mail mb-3 mx-1">
                        <Input className="text" value={props.mail} readonly disabled />
                    </div>
                    <EditButton onClick={toggleEditModal} />
                    <DeleteButton onClick={toggleDeleteModal} />
                </CardFooter>
            ) : null}
        </Card>
    );
};

export default ClubItem;
