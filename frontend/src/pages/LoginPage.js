import React, { Component } from "react";
import axios from "axios";
import UserLoginForm from "../components/UserLoginForm";
import { Button, Container } from "reactstrap";
import { setInStorage } from "../utils/storage";

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
          const obj = { token: res.data.token, results: res.data.results };
          setInStorage("object", obj);
          this.props.history.push("/dashboard");
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="login_backgound text-white">
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{
            borderRadius: "10px",
            height: "100vh"
          }}>
          <div className="d-block">
            <div className="d-flex justify-content-center align-items-center">
              <div
                className="d-block"
                style={{ height: "500px", marginTop: "80px" }}>
                <h2
                  style={{
                    textAlign: "center",
                    color: "white",
                    marginBottom: "20px"
                  }}>
                  Login Page
                </h2>
                <UserLoginForm
                  onEmailChange={this.onEmailChange}
                  onPasswordChange={this.onPasswordChange}
                />
                <div>
                  <Button className="mx-5" color="danger">
                    Cancel
                  </Button>
                  <Button
                    className="mx-5"
                    color="success"
                    onClick={() => this.onLogInClick()}>
                    Log In
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
