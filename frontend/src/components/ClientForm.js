import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

const ClientForm = props => (
  <Form>
    <FormGroup>
      <Label htmlFor="first_name">First Name:</Label>
      <Input
        onChange={props.onChange}
        type="text"
        name="first_name"
        placeholder="John"
      />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="last_name">Last Name:</Label>
      <Input
        onChange={props.onChange}
        type="text"
        name="last_name"
        placeholder="Doe"
      />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="phone">Phone:</Label>
      <Input
        onChange={props.onChange}
        type="text"
        name="phone"
        placeholder="787-787-7878"
      />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="email">Email:</Label>
      <Input
        onChange={props.onChange}
        type="text"
        name="email"
        placeholder="john.doe@hotmail.com"
      />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="address">Address:</Label>
      <Input
        onChange={props.onChange}
        type="text"
        name="address"
        placeholder="somewher"
      />
    </FormGroup>
  </Form>
);

export default ClientForm;
