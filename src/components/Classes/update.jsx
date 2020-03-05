import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { MyWrapper } from "../Login/style.js";
import firebase from "../Firebase/firebase.js";

const CreateClass = props => {
  const {
    match: {
      params: { classId }
    }
  } = props;
  const [name, setName] = useState("");
  const [hitDice, setHitDice] = useState("");
  const [equipmentProficiencies, setEquipmentProficiencies] = useState("");
  const [savingThrowProficiencies, setSavingThrowProficiencies] = useState("");
  const [skillProficiencies, setSkillProficiencies] = useState("");
  const [startingEquipment, setStartingEquipment] = useState("");
  const [classFeatures, setClassFeatures] = useState("");
  const [briefDescription, setBriefDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onLoad = async () => {
    const classRef = await firebase.database
      .collection("classes")
      .doc(classId)
      .get();
    const docSnapshot = classRef.data();
    setName(docSnapshot.name);
    setBriefDescription(docSnapshot.briefDescription);
    setHitDice(docSnapshot.hitDice);
    setEquipmentProficiencies(docSnapshot.equipmentProficiencies);
    setSavingThrowProficiencies(docSnapshot.savingThrowProficiencies);
    setSkillProficiencies(docSnapshot.skillProficiencies);
    setStartingEquipment(docSnapshot.startingEquipment);
    setClassFeatures(docSnapshot.classFeatures);

    console.log("classRef: ", docSnapshot);
  };
  const handleSubmit = async () => {
    try {
      await firebase.database
        .collection("classes")
        .doc(classId)
        .update({
          name: name,
          hitDice: hitDice,
          equipmentProficiencies: equipmentProficiencies,
          savingThrowProficiencies: savingThrowProficiencies,
          skillProficiencies: skillProficiencies,
          startingEquipment: startingEquipment,
          classFeatures: classFeatures,
          briefDescription: briefDescription
        });
      setSubmitted(true);

      console.log("added class");
    } catch (error) {
      console.log(error);
    }
  };

  const handleForm = async e => {
    e.preventDefault();
    handleSubmit();
  };

  useEffect(() => {
    onLoad();
  }, []);

  if (submitted) {
    return <Redirect to="/classes" />;
  }
  console.log("oneClass: ", props);
  return (
    <>
      {submitted ? (
        <Redirect to="/classes" />
      ) : (
        <MyWrapper>
          <Form onSubmit={handleForm}>
            <FormGroup>
              <Label for="name">Name of Your Class</Label>
              <Input
                type="text"
                name="name"
                onChange={e => setName(e.target.value)}
                value={name}
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
                value={briefDescription}
              />
            </FormGroup>
            <FormGroup>
              <Label for="hitDice">Hit Dice</Label>
              <Input
                type="text"
                name="hitDice"
                onChange={e => setHitDice(e.target.value)}
                value={hitDice}
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
                value={equipmentProficiencies}
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
                value={savingThrowProficiencies}
              />
            </FormGroup>
            <FormGroup>
              <Label for="skillProficiencies">Skill Proficiencies</Label>
              <Input
                type="text"
                name="skillProficiencies"
                onChange={e => setSkillProficiencies(e.target.value)}
                value={skillProficiencies}
              />
            </FormGroup>
            <FormGroup>
              <Label for="startingEquipment">Starting Equipment</Label>
              <Input
                type="text"
                name="startingEquipment"
                onChange={e => setStartingEquipment(e.target.value)}
                value={startingEquipment}
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
                value={classFeatures}
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
