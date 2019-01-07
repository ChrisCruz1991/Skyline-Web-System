import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

const GarageForm = props => (
  <Form className="text-white" style={{}}>
    <h2 className="text-white">Garage</h2>
    <FormGroup>
      <Label htmlFor="garage_name">Garage Name:</Label>
      <Input
        className="text-white"
        onChange={props.onChange}
        type="text"
        name="garage_name"
        placeholder="John Doe Garage"
      />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="garage_address">Address</Label>
      <Input
        className="text-white"
        onChange={props.onChange}
        type="text"
        name="garage_address"
        placeholder="Planet Mars"
      />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="garage_phone">Phone #</Label>
      <Input
        className="text-white"
        onChange={props.onChange}
        type="text"
        name="garage_phone"
        placeholder="787-000-0000"
      />
    </FormGroup>
  </Form>
);

export default GarageForm;
