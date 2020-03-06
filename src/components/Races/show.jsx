import React, { useState, useEffect } from "react";
import { withRouter, NavLink } from "react-router-dom";
import firebase from "../Firebase/firebase.js";

const RaceShow = props => {
  const {
    match: {
      params: { raceId }
    }
  } = props;
  const { currentUser } = props;

  const [oneRace, setRace] = useState({});

  const getRace = async id => {
    const raceRef = await firebase.database.collection("races").doc(id);
    const docSnapshot = await raceRef.get();
    setRace(docSnapshot.data());
  };

  useEffect(() => {
    getRace(raceId);
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
      <h1>{oneRace.name}</h1>
      <h3>Ability Score Bonuses</h3>
      <div className="card">
        <h4 className="card-body">{oneRace.abilityScores}</h4>
      </div>
      <h3>Normal Alignment</h3>
      <div>
        <h4 className="card-body">{oneRace.alignment}</h4>
      </div>
      <h3>Starting Languages</h3>
      <div>
        <h4 className="card-body">{oneRace.startingLanguages}</h4>
      </div>
      <h3>Size</h3>
      <div>
        <h4 className="card-body">{oneRace.size}</h4>
      </div>
      <h3>Speeds</h3>
      <div>
        <h4 className="card-body">
          Run speed: {oneRace.runSpeed} Fly speed: {oneRace.flySpeed} Swim
          speed: {oneRace.swimSpeed}
        </h4>
      </div>
      <h3>Tool and Equipment Proficiencies</h3>
      <div className="card">
        <h5 className="card-body">{oneRace.equipmentProficiencies}</h5>
      </div>
      <h3>Saving Throw Proficiencies</h3>
      <div className="card">
        <h5 className="card-body">{oneRace.savingThrowProficiencies}</h5>
      </div>
      <h3>Skill Proficiencies</h3>
      <div className="card">
        <h5 className="card-body">{oneRace.skillProficiencies}</h5>
      </div>
      <h3>Race Traits</h3>
      <div className="card">
        <h5 className="card-body">{oneRace.raceTraits}</h5>
      </div>
      {currentUser &&
        oneRace.createdBy &&
        currentUser.uid === oneRace.createdBy.uid && (
          <NavLink exact to={`/races/${raceId}/update`}>
            Update
          </NavLink>
        )}
    </div>
  );
};

export default withRouter(RaceShow);
