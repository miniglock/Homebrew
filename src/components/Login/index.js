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
    const { email, password } = this.state;
    e.preventDefault();
    try {
      await Firebase.doSignInUserWithEmailAndPassword(email, password);
      this.props.doSetCurrentUser({ email });
      this.setState({ isAuth: true });
      console.log("hit");
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
    const { email, password, isAuth } = this.state;
    const isInvalid = password === "" || email === "";

    if (isAuth) {
      return <Redirect to="/" />;
    }
    return (
      <MyWrapper color="pink">
        <h1> Login</h1>
        <MyForm onSubmit={this.handleMySubmit}>
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
