import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { MyWrapper } from "../Login/style.js";
import firebase from "../Firebase/firebase.js";

const CreateRace = props => {
  const [name, setName] = useState("");
  const [abilityScores, setAbilityScores] = useState("");
  const [size, setSize] = useState("");
  const [runSpeed, setRunSpeed] = useState("");
  const [flySpeed, setFlySpeed] = useState("");
  const [swimSpeed, setSwimSpeed] = useState("");
  const [alignment, setAlignment] = useState("");
  const [languages, setLanguages] = useState("");
  const [skillProficiencies, setSkillProficiencies] = useState("");
  const [equipmentProficiencies, setEquipmentProficiencies] = useState("");
  const [savingThrowProficiencies, setSavingThrowProficiencies] = useState("");
  const [raceTraits, setRaceTraits] = useState("");
  const [exists, setExists] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async e => {
    try {
      const raceRef = await firebase.database
        .collection("races")
        .where("name", "==", `${name}`);
      const docSnapshot = await raceRef.get();

      if (docSnapshot.empty) {
        firebase.database.collection("races").add({
          name: name,
          abilityScores: abilityScores,
          equipmentProficiencies: equipmentProficiencies,
          savingThrowProficiencies: savingThrowProficiencies,
          skillProficiencies: skillProficiencies,
          runSpeed: runSpeed,
          flySpeed: flySpeed,
          swimSpeed: swimSpeed,
          alignment: alignment,
          languages: languages,
          raceTraits: raceTraits,
          size: size,
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
    return <Redirect to="/races" />;
  }

  return (
    <>
      {submitted ? (
        <Redirect to="/" />
      ) : (
        <MyWrapper>
          {exists && (
            <h2 style={{ color: "red" }}>
              A race with that name already exists in the database. Please
              rename your race and try again.
            </h2>
          )}
          <Form onSubmit={handleForm}>
            <FormGroup>
              <Label for="name">Name of Your Race</Label>
              <Input
                type="text"
                name="name"
                placeholder="Dwarf"
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="abilityScores">Ability Score Bonuses</Label>
              <Input
                type="textarea"
                name="abilityScores"
                onChange={e => setAbilityScores(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="size">Size</Label>
              <Input
                type="text"
                name="size"
                onChange={e => setSize(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="speed">Speeds</Label>
              <Input
                type="text"
                name="speed"
                placeholder="Run Speed"
                onChange={e => setRunSpeed(e.target.value)}
              />
              <Input
                type="text"
                name="speed"
                placeholder="Swim Speed"
                onChange={e => setSwimSpeed(e.target.value)}
              />
              <Input
                type="text"
                name="speed"
                placeholder="Fly Speed"
                onChange={e => setFlySpeed(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="alignment">Normal Alignment</Label>
              <Input
                type="text"
                name="alignment"
                onChange={e => setAlignment(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="languages">Starting Languages</Label>
              <Input
                type="text"
                name="languages"
                onChange={e => setLanguages(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="equipmentProficiencies">
                Tool and Equipment Proficiencies
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
              <Label for="raceTraits">Race Features</Label>
              <FormText color="muted">
                Please copy and paste from the source document in plain text.
              </FormText>
              <Input
                type="textarea"
                name="raceTraits"
                onChange={e => setRaceTraits(e.target.value)}
              />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </MyWrapper>
      )}
    </>
  );
};

export default CreateRace;
