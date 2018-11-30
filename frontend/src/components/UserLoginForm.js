import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

const UserLoginForm = props => (
  <Form>
    <FormGroup>
      <Label for="email">Email:</Label>
      <Input
        onChange={props.onEmailChange}
        type="text"
        name="email"
        placeholder="foo@bar.com"
      />
    </FormGroup>
    <FormGroup>
      <Label for="password">Password:</Label>
      <Input
        onChange={props.onPasswordChange}
        type="password"
        name="password"
      />
    </FormGroup>
  </Form>
);

export default UserLoginForm;
