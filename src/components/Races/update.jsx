import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { MyWrapper } from "../Login/style.js";
import firebase from "../Firebase/firebase.js";

const RaceUpdate = props => {
  const {
    match: {
      params: { raceId }
    }
  } = props;
  const [oldName, setOldName] = useState("");
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

  const onLoad = async () => {
    const raceRef = await firebase.database
      .collection("races")
      .doc(raceId)
      .get();
    const docSnapshot = raceRef.data();
    setOldName(docSnapshot.name);
    setName(docSnapshot.name);
    setSize(docSnapshot.size);
    setRunSpeed(docSnapshot.runSpeed);
    setFlySpeed(docSnapshot.flySpeed);
    setSwimSpeed(docSnapshot.swimSpeed);
    setAlignment(docSnapshot.alignment);
    setLanguages(docSnapshot.languages);
    setEquipmentProficiencies(docSnapshot.equipmentProficiencies);
    setSavingThrowProficiencies(docSnapshot.savingThrowProficiencies);
    setSkillProficiencies(docSnapshot.skillProficiencies);
    setRaceTraits(docSnapshot.raceTraits);
    setAbilityScores(docSnapshot.abilityScores);
  };
  const handleSubmit = async () => {
    try {
      if (oldName !== name) {
        const raceRef = await firebase.database
          .collection("races")
          .where(raceId, "!=", "hello")
          .where("name", "==", `${name}`);
        const docSnapshot = await raceRef.get();

        if (docSnapshot.empty) {
          await firebase.database
            .collection("races")
            .doc(raceId)
            .update({
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
              size: size
            });
          setSubmitted(true);
        } else if (!docSnapshot.empty) {
          setExists(true);
        }
      } else if (oldName === name) {
        await firebase.database
          .collection("races")
          .doc(raceId)
          .update({
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
            size: size
          });
        setSubmitted(true);
      }
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
    // eslint-disable-next-line
  }, []);

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
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="abilityScores">Ability Score Bonuses</Label>
              <Input
                type="textarea"
                name="abilityScores"
                value={abilityScores}
                onChange={e => setAbilityScores(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="size">Size</Label>
              <Input
                type="text"
                name="size"
                value={size}
                onChange={e => setSize(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="speed">Speeds</Label>
              <Input
                type="text"
                name="speed"
                placeholder="Run Speed"
                value={runSpeed}
                onChange={e => setRunSpeed(e.target.value)}
              />
              <Input
                type="text"
                name="speed"
                placeholder="Swim Speed"
                value={swimSpeed}
                onChange={e => setSwimSpeed(e.target.value)}
              />
              <Input
                type="text"
                name="speed"
                placeholder="Fly Speed"
                value={flySpeed}
                onChange={e => setFlySpeed(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="alignment">Normal Alignment</Label>
              <Input
                type="text"
                name="alignment"
                value={alignment}
                onChange={e => setAlignment(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="languages">Starting Languages</Label>
              <Input
                type="text"
                name="languages"
                value={languages}
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
                value={equipmentProficiencies}
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
                value={savingThrowProficiencies}
                onChange={e => setSavingThrowProficiencies(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="skillProficiencies">Skill Proficiencies</Label>
              <Input
                type="text"
                name="skillProficiencies"
                value={skillProficiencies}
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
                value={raceTraits}
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

export default RaceUpdate;
