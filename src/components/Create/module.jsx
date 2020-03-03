import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { MyWrapper } from "../Login/style.js";
import firebase from "../Firebase/firebase.js";

const CreateModule = props => {
  const [name, setName] = useState("");
  const [briefDescription, setBriefDescription] = useState("");
  const [numberOfPlayers, setnumberOfPlayers] = useState("3 or less");
  const [fullModule, setFullModule] = useState("");
  const [exists, setExists] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const addModule = async e => {
    try {
      const raceRef = await firebase.database
        .collection("modules")
        .where("name", "==", `${name}`);
      const docSnapshot = await raceRef.get();
      console.log("raceRef: ", docSnapshot);

      if (docSnapshot.empty) {
        firebase.database.collection("modules").add({
          name: name,
          briefDescription: briefDescription,
          numberOfPlayers: numberOfPlayers,
          fullModule: fullModule
        });
        setSubmitted(true);

        console.log("added module");
      } else if (!docSnapshot.empty) {
        setExists(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleForm = async e => {
    e.preventDefault();
    addModule();
  };

  if (submitted) {
    return <Redirect to="/modules" />;
  }

  return (
    <>
      {submitted ? (
        <Redirect to="/" />
      ) : (
        <MyWrapper>
          {exists && (
            <h2 style={{ color: "red" }}>
              A module with that name already exists in the database. Please
              rename your module and try again.
            </h2>
          )}
          <Form onSubmit={handleForm}>
            <FormGroup>
              <Label for="name">Name of Your Module</Label>
              <Input
                type="text"
                name="name"
                placeholder="Tower of Babylon"
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="briefDescription">Brief Description</Label>
              <Input
                type="text"
                name="briefDescription"
                onChange={e => setBriefDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="numberOfPlayers">Recommended Number of Players</Label>
              <Input
                type="select"
                name="numberOfPlayers"
                onChange={e => setnumberOfPlayers(e.target.value)}
              >
                <option>3 or less</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8 or more</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="fullDescription">Full Module</Label>
              <FormText color="muted">
                Please copy and paste from the source document in plain text.
              </FormText>
              <Input
                type="textarea"
                name="fullDescription"
                onChange={e => setFullModule(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleFile">Associated Files</Label>
              <Input type="file" name="file" id="exampleFile" />
              <FormText color="muted">
                Please upload any associate files such as maps etc.
              </FormText>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </MyWrapper>
      )}
    </>
  );
};

export default CreateModule;
