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
import { getFromStorage } from "../utils/storage";

export default class EmployeesForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    phone: "",
    address: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  formSubmit = e => {
    e.preventDefault();
    const { garage_id } = getFromStorage("object");
    const { first_name, last_name, phone, address } = this.state;
    this.setState({ isLoading: true });

    // post request to create new employee
    axios
      .post("http://localhost:8080/api/employee/new", {
        first_name,
        last_name,
        phone,
        address,
        garage_id
      })
      .then(res => {
        console.log(res);
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
          }}
        >
          <Button color="info" onClick={this.formSubmit}>
            Submit
          </Button>
          <Button color="warning" onCanPlay={this.formCancel}>
            Cancel
          </Button>
        </Row>
      </Container>
    );
  }
}
