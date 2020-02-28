import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Firebase from "../Firebase/firebase";

import { Wrapper, Form } from "./style";

class Signup extends Component {
  state = {
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    isAuth: false,
    error: null
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFormSubmit = async e => {
    const { email, passwordOne, username } = this.state;
    e.preventDefault();
    this.props.doSetCurrentUser({
      username,
      email
    });
    try {
      await Firebase.doCreateUserWithEmailAndPassword(email, passwordOne);
      this.setState({ isAuth: true });
    } catch (error) {
      this.setState({
        error
      });
      setTimeout(() => {
        this.setState({ error: null });
      }, 3000);
    }
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAuth,
      error
    } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    if (isAuth) {
      return <Redirect to="/" />;
    }
    return (
      <Wrapper color={"pink"}>
        <h1>Sign Up</h1>
        <Form onSubmit={this.handleFormSubmit}>
          <input
            placeholder="Full Name"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            placeholder="Email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            placeholder="Password"
            type="password"
            name="passwordOne"
            value={passwordOne}
            onChange={this.handleChange}
          />
          <input
            placeholder="Confirm Password"
            type="password"
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.handleChange}
          />
          <button disabled={isInvalid} type="submit">
            Submit
          </button>
        </Form>
        {error && <div style={{ color: "red" }}>{error.message}</div>}
      </Wrapper>
    );
  }
}

export default Signup;
