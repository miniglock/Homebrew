import React, { useState, useEffect } from "react";
import { withRouter, NavLink, Redirect } from "react-router-dom";
import firebase from "../Firebase/firebase.js";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModuleShow = props => {
  const {
    match: {
      params: { moduleId }
    }
  } = props;

  const [submitted, setSubmitted] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const { currentUser } = props;

  const [oneModule, setModule] = useState({});
  // eslint-disable-next-line
  const [id, setId] = useState(moduleId);

  const getModule = async id => {
    const moduleRef = await firebase.database.collection("modules").doc(id);
    const docSnapshot = await moduleRef.get();
    setModule(docSnapshot.data());
  };
  console.log(moduleId);

  const moduleDelete = () => {
    firebase.database
      .collection("modules")
      .doc(moduleId)
      .delete()
      .then(() => {
        setSubmitted(true);
      });
    console.log("deleted");
  };

  useEffect(() => {
    getModule(id);
  }, [id]);
  if (submitted) {
    return <Redirect to="/modules" />;
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
      <h1>{oneModule.name}</h1>
      <h3>Brief Description</h3>
      <div className="card">
        <h4 className="card-body">{oneModule.briefDescription}</h4>
      </div>
      <h3>Number of Players</h3>
      <div className="card">
        <h4 className="card-body">{oneModule.numberOfPlayers}</h4>
      </div>
      <h3>Full Module</h3>
      <div className="card">
        <h5 className="card-body">{oneModule.fullModule}</h5>
      </div>
      {currentUser &&
        oneModule.createdBy &&
        currentUser.uid === oneModule.createdBy.uid && (
          <div style={{ display: "flex", marginTop: "3px" }}>
            <div style={{ marginRight: "3px" }}>
              <NavLink
                className="btn btn-danger"
                exact
                to={`/modules/${moduleId}/update`}
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
                  <Button color="primary" onClick={moduleDelete}>
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

export default withRouter(ModuleShow);
