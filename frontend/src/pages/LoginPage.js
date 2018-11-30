import React, { Component } from "react";
import axios from "axios";
import UserLoginForm from "../components/UserLoginForm";
import { Button } from "reactstrap";
import { setInStorage, getFromStorage } from "../utils/storage";

export default class LoginPage extends Component {
  state = {
    email: "",
    password: ""
  };

  onEmailChange = e => {
    const email = e.target.value;
    this.setState({ email });
  };

  onPasswordChange = e => {
    const password = e.target.value;
    this.setState({ password });
  };

  onLogInClick = () => {
    const { email, password } = this.state;
    axios
      .post("http://localhost:8080/api/login", {
        email,
        password
      })
      .then(res => {
        console.log(res);
        if (res.data.success) {
          console.log("Im in");
          const obj = res.data.results;
          setInStorage("object", obj);
          this.props.history.push("/dashboard");
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>Login Page</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <UserLoginForm
            onEmailChange={this.onEmailChange}
            onPasswordChange={this.onPasswordChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Button>Cancel</Button>
          <Button onClick={this.onLogInClick}>Log In</Button>
        </div>
      </div>
    );
  }
}
