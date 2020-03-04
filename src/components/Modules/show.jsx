import React, { useState, useEffect } from "react";
import firebase from "../Firebase/firebase.js";

const ModuleShow = props => {
  const {
    match: {
      params: { moduleId }
    }
  } = props;

  const [oneModule, setModule] = useState({});
  const [id, setId] = useState(moduleId);

  const getModule = async id => {
    const moduleRef = await firebase.database.collection("modules").doc(id);
    const docSnapshot = await moduleRef.get();
    setModule(docSnapshot.data());
  };

  useEffect(() => {
    getModule(id);
  }, [id]);

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
    </div>
  );
};

export default ModuleShow;
