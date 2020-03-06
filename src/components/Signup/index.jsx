import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Firebase from "../Firebase/firebase";
import { MyForm, MyWrapper } from "./style";

const Signup = ({ doSetCurrentUser, doAuth }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === "" ||
    email === "" ||
    passwordOne === " ";

  const handleForm = async e => {
    e.preventDefault();
    if (isInvalid) {
      return;
    } else {
      try {
        const { user } = await Firebase.doCreateUserWithEmailAndPassword(
          email,
          passwordOne
        );
        await Firebase.database
          .collection("users")
          .doc(user.uid)
          .set({
            userName: userName,
            email: email
          });
        doSetCurrentUser({
          userName,
          email
        });
        setIsAuth(true);
      } catch (err) {
        console.log(err);
      }
    }
  };
  if (isAuth) {
    return <Redirect to="/" />;
  }
  return (
    <MyWrapper color="pink">
      <h1>Signup</h1>
      <MyForm onSubmit={handleForm}>
        <input
          type="text"
          placeholder="user name"
          name="userName"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="passwordOne"
          value={passwordOne}
          onChange={e => setPasswordOne(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="passwordTwo"
          value={passwordTwo}
          onChange={e => setPasswordTwo(e.target.value)}
        />

        <button type="submit" disabled={isInvalid}>
          Sign up
        </button>
      </MyForm>
    </MyWrapper>
  );
};
export default Signup;
