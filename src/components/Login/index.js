import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Firebase from "../Firebase/firebase";
import { PasswordForgetLink } from "../PasswordForget";
import { MyWrapper, MyForm } from "./style";

class Login extends Component {
  state = {
    email: "",
    password: "",
    isAuth: false,
    error: null
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const userAuth = await Firebase.doSignInUserWithEmailAndPassword(
        email,
        password
      );

      this.props.doSetCurrentUser({ email });
      this.setState({ isAuth: true });
    } catch (error) {
      this.setState({
        error
      });
      this.setState({ error: null });
    }
  };
  render() {
    const { email, password, isAuth } = this.state;
    const isInvalid = password === "" || email === "";

    if (isAuth) {
      return <Redirect to="/" />;
    }
    return (
      <MyWrapper color="pink">
        <h1> Login</h1>
        <MyForm onSubmit={this.handleFormSubmit}>
          <input
            placeholder="Email"
            type="text"
            name="email"
            onChange={this.handleChange}
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={this.handleChange}
          />
          <button disabled={isInvalid} type="submit">
            Submit
          </button>
        </MyForm>
        <PasswordForgetLink />
      </MyWrapper>
    );
  }
}

export default Login;
