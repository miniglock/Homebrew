import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import firebase from "../Firebase/firebase.js";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";

const Races = () => {
  const [existingRaces, setData] = useState([]);

  const getRaces = async () => {
    const raceRef = await firebase.database.collection("races").get();

    setData([...raceRef.docs.map(doc => ({ ...doc.data(), id: doc.id }))]);
  };

  useEffect(() => {
    getRaces();
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
      {existingRaces.map((r, i) => (
        <NavLink exact to={`/races/${r.id}`}>
          <ListGroupItem
            style={{
              textAlign: "center",
              color: "white",
              backgroundColor: "#8FB339",
              boxShadow: "53px 10px 0px 1px rgba(72,53,25,1)",
              margin: "10px"
            }}
          >
            <ListGroupItemHeading>{r.name}</ListGroupItemHeading>
            <ListGroupItemText>{r.abilityScores}</ListGroupItemText>
          </ListGroupItem>
        </NavLink>
      ))}
    </ListGroup>
  );
};

export default Races;
