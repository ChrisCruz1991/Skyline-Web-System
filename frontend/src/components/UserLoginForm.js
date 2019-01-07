import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

const UserLoginForm = props => (
  <Form>
    <FormGroup className="px-auto">
      <Label className="" for="email">
        Email:
      </Label>
      <Input
        style={{ backgroundColor: "rgba(141, 143, 143, .1)", color: "white" }}
        onChange={props.onEmailChange}
        type="text"
        name="email"
        placeholder="foo@bar.com"
      />
    </FormGroup>
    <FormGroup>
      <Label for="password">Password:</Label>
      <Input
        style={{ backgroundColor: "rgba(141, 143, 143, .1)", color: "white" }}
        onChange={props.onPasswordChange}
        type="password"
        name="password"
      />
    </FormGroup>
  </Form>
);

export default UserLoginForm;
