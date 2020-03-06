import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { MyWrapper } from "../Login/style.js";
import firebase from "../Firebase/firebase.js";

const CreateClass = props => {
  const [name, setName] = useState("");
  const [hitDice, setHitDice] = useState("");
  const [equipmentProficiencies, setEquipmentProficiencies] = useState("");
  const [savingThrowProficiencies, setSavingThrowProficiencies] = useState("");
  const [skillProficiencies, setSkillProficiencies] = useState("");
  const [startingEquipment, setStartingEquipment] = useState("");
  const [classFeatures, setClassFeatures] = useState("");
  const [briefDescription, setBriefDescription] = useState("");
  const [exists, setExists] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async e => {
    try {
      const classRef = await firebase.database
        .collection("classes")
        .where("name", "==", `${name}`);
      const docSnapshot = await classRef.get();

      if (docSnapshot.empty) {
        firebase.database.collection("classes").add({
          name: name,
          hitDice: hitDice,
          equipmentProficiencies: equipmentProficiencies,
          savingThrowProficiencies: savingThrowProficiencies,
          skillProficiencies: skillProficiencies,
          startingEquipment: startingEquipment,
          classFeatures: classFeatures,
          briefDescription: briefDescription,
          createdBy: props.currentUser
        });
        setSubmitted(true);
      } else if (!docSnapshot.empty) {
        setExists(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleForm = async e => {
    e.preventDefault();
    handleSubmit();
  };

  if (submitted) {
    return <Redirect to="/classes" />;
  }

  return (
    <>
      {submitted ? (
        <Redirect to="/" />
      ) : (
        <MyWrapper>
          {exists && (
            <h2 style={{ color: "red" }}>
              A class with that name already exists in the database. Please
              rename your class and try again.
            </h2>
          )}
          <Form onSubmit={handleForm}>
            <FormGroup>
              <Label for="name">Name of Your Class</Label>
              <Input
                type="text"
                name="name"
                placeholder="Barbarian"
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="briefDescription">
                Brief Description of your Class
              </Label>
              <Input
                type="textarea"
                name="briefDescription"
                onChange={e => setBriefDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="hitDice">Hit Dice</Label>
              <Input
                type="text"
                name="hitDice"
                onChange={e => setHitDice(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="equipmentProficiencies">
                Equipment Proficiencies
              </Label>
              <Input
                type="text"
                name="equipmentProficiencies"
                onChange={e => setEquipmentProficiencies(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="savingThrowProficiencies">
                Saving Throw Proficiencies
              </Label>
              <Input
                type="text"
                name="savingThrowProficiencies"
                onChange={e => setSavingThrowProficiencies(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="skillProficiencies">Skill Proficiencies</Label>
              <Input
                type="text"
                name="skillProficiencies"
                onChange={e => setSkillProficiencies(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="startingEquipment">Starting Equipment</Label>
              <Input
                type="text"
                name="startingEquipment"
                onChange={e => setStartingEquipment(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="classFeatures">Class Features by Level</Label>
              <FormText color="muted">
                Please copy and paste from the source document in plain text.
              </FormText>
              <Input
                type="textarea"
                name="classFeatures"
                onChange={e => setClassFeatures(e.target.value)}
              />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </MyWrapper>
      )}
    </>
  );
};

export default CreateClass;
