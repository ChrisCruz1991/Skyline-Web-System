import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

const UserForm = props => (
  <Form className="text-white">
    <h2 className="text-white">Manager</h2>
    <FormGroup>
      <Label for="first_name">First Name:</Label>
      <Input
        style={{ color: "white" }}
        onChange={props.onChange}
        type="text"
        name="first_name"
        placeholder="John"
      />
    </FormGroup>
    <FormGroup>
      <Label for="last_name">Last Name:</Label>
      <Input
        style={{ color: "white" }}
        onChange={props.onChange}
        type="text"
        name="last_name"
        placeholder="Doe"
      />
    </FormGroup>
    <FormGroup>
      <Label for="email">Email:</Label>
      <Input
        style={{ color: "white" }}
        onChange={props.onChange}
        type="text"
        name="email"
        placeholder="john.doe@gmail.com"
      />
    </FormGroup>
    <FormGroup>
      <Label for="password">Password:</Label>
      <Input
        style={{ color: "white" }}
        onChange={props.onChange}
        type="password"
        name="password"
        placeholder="whatever"
      />
    </FormGroup>
    <FormGroup>
      <Label for="phone">Phone:</Label>
      <Input
        style={{ color: "white" }}
        onChange={props.onChange}
        type="text"
        name="phone"
        placeholder="787-111-1111"
      />
    </FormGroup>
    <FormGroup>
      <Label for="address">Address:</Label>
      <Input
        style={{ color: "white" }}
        onChange={props.onChange}
        type="text"
        name="address"
        placeholder="Planet Marth"
      />
    </FormGroup>
  </Form>
);

export default UserForm;
