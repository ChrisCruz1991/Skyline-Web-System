import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import { Redirect } from "react-router-dom";
import { getFromStorage } from "../utils/storage";

export default class EmployeesForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    valid: true,
    addedd: false
  };

  onChange = e => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  validFormatError = _ => {
    this.setState({
      valid: false
    });
  };

  formSubmit = e => {
    if (this.state.first_name.length < 5) {
      this.validFormatError();
      return null;
    }

    if (this.state.last_name.length < 5) {
      this.validFormatError();
      return null;
    }

    if (this.state.address.length < 5) {
      this.validFormatError();
      return;
    }

    if (this.state.phone.length < 5) {
      this.validFormatError();
      return;
    }
    e.preventDefault();
    const storage = getFromStorage("object");
    const { first_name, last_name, phone, address } = this.state;
    console.log(storage.results.garage_id);
    this.setState({ isLoading: true });
    // post request to create new employee
    axios
      .post("http://localhost:8080/api/employee/new", {
        first_name,
        last_name,
        phone,
        address,
        garage_id: storage.results.garage_id,
        addedd: true
      })
      .then(res => {
        console.log(res);
        // this.props.history.push("/employees");
      });
  };

  formCancel = () => {
    console.log("supposed to clear input fields, but yolo");
  };

  render() {
    return (
      <Container style={{ marginTop: "10px" }}>
        <Row>
          <Col style={{ margin: "0 auto" }}>
            <h3>New Employee</h3>
            <p>Add a new employee that is gonna be working in your garage</p>
          </Col>
        </Row>
        <Form>
          <FormGroup>
            <Label htmlFor="first_name">First Name:</Label>
            <Input
              onChange={this.onChange}
              type="text"
              name="first_name"
              placeholder="John"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="last_name">Last Name:</Label>
            <Input
              onChange={this.onChange}
              type="text"
              name="last_name"
              placeholder="Doe"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="phone">Phone:</Label>
            <Input
              onChange={this.onChange}
              type="text"
              name="phone"
              placeholder="787-000-0000"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="address">Address:</Label>
            <Input
              onChange={this.onChange}
              type="text"
              name="address"
              placeholder="somewhere"
            />
          </FormGroup>
        </Form>
        <Row
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center"
          }}>
          <Button color="info" onClick={this.formSubmit}>
            Submit
          </Button>
          <Button color="warning" onCanPlay={this.formCancel}>
            Cancel
          </Button>
        </Row>
        <center>
          {this.state.valid === false ? (
            <p className="text-danger">Error on input</p>
          ) : null}
          {this.state.addedd === true ? (
            <p className="text-primary">Added Employee</p>
          ) : null}
        </center>
      </Container>
    );
  }
}
