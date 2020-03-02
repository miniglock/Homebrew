import React, { useState, useEffect } from "react";
import firebase from "../Firebase/firebase.js";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";

const Modules = () => {
  const [existingModules, setData] = useState([]);

  const getModules = async () => {
    const moduleRef = await firebase.database.collection("modules").get();
    setData([...moduleRef.docs.map(doc => doc.data())]);
  };

  useEffect(() => {
    getModules();
  }, []);

  return (
    <ListGroup>
      {existingModules.map((m, i) => (
        <ListGroupItem
          style={{ textAlign: "center", backgroundColor: "#ff6666" }}
        >
          <ListGroupItemHeading>{m.name}</ListGroupItemHeading>
          <ListGroupItemText>{m.briefDescription}</ListGroupItemText>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default Modules;
