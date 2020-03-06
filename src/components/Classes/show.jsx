import React, { useState, useEffect } from "react";
import { withRouter, NavLink } from "react-router-dom";
import firebase from "../Firebase/firebase.js";

const ClassShow = props => {
  const {
    match: {
      params: { classId }
    }
  } = props;
  const { currentUser } = props;

  const [oneClass, setClass] = useState({});

  const getClass = async id => {
    const classRef = await firebase.database.collection("classes").doc(id);
    const docSnapshot = await classRef.get();
    setClass(docSnapshot.data());
  };

  useEffect(() => {
    getClass(classId);
    // eslint-disable-next-line
  }, []);

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
          <NavLink exact to={`/classes/${classId}/update`}>
            Update
          </NavLink>
        )}
    </div>
  );
};

export default withRouter(ClassShow);
