import React, { useState, useEffect } from "react";
import { withRouter, NavLink, Redirect } from "react-router-dom";
import firebase from "../Firebase/firebase.js";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ClassShow = props => {
  const {
    match: {
      params: { classId }
    }
  } = props;
  const { currentUser } = props;

  const [submitted, setSubmitted] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [oneClass, setClass] = useState({});

  const getClass = async id => {
    const classRef = await firebase.database.collection("classes").doc(id);
    const docSnapshot = await classRef.get();
    setClass(docSnapshot.data());
  };
  const classDelete = () => {
    firebase.database
      .collection("classes")
      .doc(classId)
      .delete()
      .then(() => {
        setSubmitted(true);
      });
    console.log("deleted");
  };
  useEffect(() => {
    getClass(classId);
    // eslint-disable-next-line
  }, []);
  if (submitted) {
    return <Redirect to="/classes" />;
  }
  return (
    <div
      style={{
        margin: "0 10% 0 10%",
        boxSizing: "border-box",
        justifyContent: "center",
        justifyItems: "center"
      }}
    >
      <h1>{oneClass.name}</h1>
      <h3>Brief Description</h3>
      <div className="card">
        <h4 className="card-body">{oneClass.briefDescription}</h4>
      </div>
      <h3>Hit Dice</h3>
      <div>
        <h4 className="card-body">{oneClass.hitDice} per level</h4>
      </div>
      <h3>Equipment Proficiencies</h3>
      <div className="card">
        <h5 className="card-body">{oneClass.equipmentProficiencies}</h5>
      </div>
      <h3>Saving Throw Proficiencies</h3>
      <div className="card">
        <h5 className="card-body">{oneClass.savingThrowProficiencies}</h5>
      </div>
      <h3>Skill Proficiencies</h3>
      <div className="card">
        <h5 className="card-body">{oneClass.skillProficiencies}</h5>
      </div>
      <h3>Starting Equipment</h3>
      <div className="card">
        <h5 className="card-body">{oneClass.startingEquipment}</h5>
      </div>
      <h3>Class Features</h3>
      <div className="card">
        <h5 className="card-body">{oneClass.classFeatures}</h5>
      </div>
      {currentUser &&
        oneClass.createdBy &&
        currentUser.uid === oneClass.createdBy.uid && (
          <div style={{ display: "flex", marginTop: "3px" }}>
            <div style={{ marginRight: "3px" }}>
              <NavLink
                className="btn btn-danger"
                exact
                to={`/class/${classId}/update`}
              >
                Update
              </NavLink>
            </div>
            <div>
              <Button color="danger" onClick={toggle}>
                Delete
              </Button>
              <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Confirm Delete</ModalHeader>
                <ModalBody>Please confirm deletion</ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={classDelete}>
                    Delete
                  </Button>{" "}
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        )}
    </div>
  );
};

export default withRouter(ClassShow);
