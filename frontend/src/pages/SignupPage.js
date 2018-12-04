import React, { Component } from "react";
import GarageForm from "../components/GarageForm";
import UserForm from "../components/UserForm";
import { Button } from "reactstrap";
import axios from "axios";

export default class SignupPage extends Component {
  state = {
    garage_name: "",
    garage_address: "",
    garage_phone: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    isLoading: false
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCancelClick = () => {
    console.log("soemething");
  };

  onRegisterClick = e => {
    e.preventDefault();
    const {
      garage_name,
      garage_address,
      garage_phone,
      first_name,
      last_name,
      email,
      password,
      phone,
      address
    } = this.state;

    this.setState({ isLoading: true });

    //Post the request to the backend
    axios
      .post("http://localhost:8080/api/signup", {
        garage_name,
        garage_address,
        garage_phone,
        first_name,
        last_name,
        email,
        password,
        phone,
        address
      })
      .then(res => {
        this.setState({ isLoading: false });
        this.props.history.push("/login");
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="signUp_background">
        <h2 className="text-white" style={{ textAlign: "center" }}>
          Register Form
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <div
            className="mr-5 p-3"
            style={{
              backgroundColor: "rgba(128, 128, 128, .9)",
              width: "500px",
              borderRadius: "13px"
            }}
          >
            <GarageForm onChange={this.onChange} />
          </div>
          <div
            className="ml-5 p-3"
            style={{
              backgroundColor: "rgba(128, 128, 128, .9)",
              width: "500px",
              borderRadius: "13px"
            }}
          >
            <UserForm onChange={this.onChange} />
          </div>
        </div>
        <div
          className="my-3 pb-3"
          style={{
            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <Button onClick={this.onCancelClick}>Cancel</Button>
          <Button onClick={this.onRegisterClick}>Register</Button>
        </div>
      </div>
    );
  }
}
