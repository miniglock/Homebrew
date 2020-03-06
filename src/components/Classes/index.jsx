import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import firebase from "../Firebase/firebase.js";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";

const Classes = props => {
  const [existingClasses, setClasses] = useState([]);

  const getClasses = async () => {
    const classRef = await firebase.database.collection("classes").get();

    setClasses([...classRef.docs.map(doc => ({ ...doc.data(), id: doc.id }))]);
  };

  useEffect(() => {
    getClasses();
    // eslint-disable-next-line
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
      {existingClasses.map((c, i) => (
        <NavLink exact to={`/classes/${c.id}`} classId={c.id}>
          <ListGroupItem
            style={{
              textAlign: "center",
              color: "white",
              backgroundColor: "#8FB339",
              boxShadow: "53px 10px 0px 1px rgba(72,53,25,1)",
              margin: "10px"
            }}
          >
            <ListGroupItemHeading>{c.name}</ListGroupItemHeading>
            <ListGroupItemText>{c.briefDescription}</ListGroupItemText>
          </ListGroupItem>
        </NavLink>
      ))}
    </ListGroup>
  );
};

export default Classes;
