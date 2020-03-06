import React from "react";
import { NavLink } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";

const LandingPage = props => {
  const { modules } = props;
  const { races } = props;
  const { classes } = props;

  return (
    <>
      <h2>Check out some of our modules!</h2>
      <ListGroup
        style={{
          margin: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "50%"
        }}
      >
        {modules.map((m, i) => (
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
      <h2>Check out some of our classes!</h2>
      <ListGroup
        style={{
          margin: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "50%"
        }}
      >
        {classes.map((c, i) => (
          <NavLink exact to={`/classes/${c.id}`} key={i}>
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
      <h2>Check out some of our races!</h2>
      <ListGroup
        style={{
          margin: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "50%"
        }}
      >
        {races.map((r, i) => (
          <NavLink exact key={i} to={`/races/${r.id}`}>
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
    </>
  );
};

export default LandingPage;
