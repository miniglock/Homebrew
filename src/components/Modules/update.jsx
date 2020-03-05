import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { MyWrapper } from "../Login/style.js";
import firebase from "../Firebase/firebase.js";

const UpdateModule = props => {
  const {
    match: {
      params: { moduleId }
    }
  } = props;
  const [name, setName] = useState("");
  const [briefDescription, setBriefDescription] = useState("");
  const [numberOfPlayers, setnumberOfPlayers] = useState("3 or less");
  const [fullModule, setFullModule] = useState("");
  const [exists, setExists] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onLoad = async () => {
    const moduleRef = await firebase.database
      .collection("modules")
      .doc(moduleId)
      .get();
    const docSnapshot = moduleRef.data();
    setName(docSnapshot.name);
    setBriefDescription(docSnapshot.briefDescription);
    setnumberOfPlayers(docSnapshot.numberOfPlayers);
    setFullModule(docSnapshot.fullModule);
  };

  const addModule = async e => {
    try {
      const moduleRef = await firebase.database
        .collection("modules")
        .where("name", "==", `${name}`);
      const docSnapshot = await moduleRef.get();
      console.log(docSnapshot);

      //   firebase.database
      //     .collection("modules")
      //     .doc(moduleId)
      //     .update({
      //       name: name,
      //       briefDescription: briefDescription,
      //       numberOfPlayers: numberOfPlayers,
      //       fullModule: fullModule
      //     });
      //   setSubmitted(true);

      console.log("added module");
    } catch (error) {
      console.log(error);
    }
  };
  const handleForm = async e => {
    e.preventDefault();
    addModule();
  };
  useEffect(() => {
    onLoad();
  }, []);

  if (submitted) {
    return <Redirect to="/modules" />;
  }

  return (
    <>
      {submitted ? (
        <Redirect to="/" />
      ) : (
        <MyWrapper>
          <Form onSubmit={handleForm}>
            <FormGroup>
              <Label for="name">Name of Your Module</Label>
              <Input
                type="text"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="briefDescription">Brief Description</Label>
              <Input
                type="text"
                name="briefDescription"
                value={briefDescription}
                onChange={e => setBriefDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="numberOfPlayers">Recommended Number of Players</Label>
              <Input
                type="select"
                name="numberOfPlayers"
                value={numberOfPlayers}
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
                value={fullModule}
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

export default UpdateModule;
