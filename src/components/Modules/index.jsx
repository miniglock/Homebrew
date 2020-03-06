import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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

    setData([...moduleRef.docs.map(doc => ({ ...doc.data(), id: doc.id }))]);
  };
  useEffect(() => {
    getModules();
  }, []);
  return (
    <ListGroup
      style={{
        margin: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "50%"
      }}
    >
      {existingModules.map((m, i) => (
        <NavLink exact to={`/modules/${m.id}`}>
          <ListGroupItem
            style={{
              textAlign: "center",
              color: "white",
              backgroundColor: "#8FB339",
              boxShadow: "53px 10px 0px 1px rgba(72,53,25,1)",
              margin: "10px"
            }}
          >
            <ListGroupItemHeading>{m.name}</ListGroupItemHeading>
            <ListGroupItemText>{m.briefDescription}</ListGroupItemText>
          </ListGroupItem>
        </NavLink>
      ))}
    </ListGroup>
  );
};

export default Modules;
