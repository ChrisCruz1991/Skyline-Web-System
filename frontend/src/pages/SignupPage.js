import React, { Component } from "react";
import GarageForm from "../components/GarageForm";
import UserForm from "../components/UserForm";
import { Button, Container, Row, Col } from "reactstrap";
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
        <Container className="mt-2">
          <h2 className="text-white" style={{ textAlign: "center" }}>
            Register Form
          </h2>
          <Row>
            <Col md={6} sm={12}>
              <GarageForm onChange={this.onChange} />
              <div className="my-3 pb-3">
                <Button className="mr-4 px-5" onClick={this.onCancelClick}>
                  Cancel
                </Button>
                <Button className="mx-4 px-5" onClick={this.onRegisterClick}>
                  Register
                </Button>
              </div>
            </Col>
            <Col md={6} sm={12}>
              <UserForm onChange={this.onChange} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
