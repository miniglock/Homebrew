import React, { useState, useEffect } from "react";
import Firebase from "../../components/Firebase/firebase.js";

const Profile = () => {
  const addRace = async race => {
    const raceRef = await Firebase.database
      .collection("races")
      .where("name", "==", "gnome");
    const docSnapshot = await raceRef.get();
    console.log(docSnapshot);

    if (docSnapshot.empty) {
      Firebase.database.collection("races").add({ name: "gnome" });
    }
  };

  const fetchRaces = async () => {
    const racesRef = await Firebase.database.collection("races");
    const querySnapshot = await racesRef.get();
    querySnapshot.forEach(doc => {
      console.log(doc.data());
    });
  };

  useEffect(() => {
    addRace();
  }, []);

  useEffect(() => {
    fetchRaces();
  }, []);

  return (
    <>
      <div>Hello User</div>
      <div>You are happy</div>
    </>
  );
};

export default Profile;
