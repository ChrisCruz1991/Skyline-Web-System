import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

const VehicleForm = props => (
  <Form>
    <FormGroup>
      <Label htmlFor="make">Make:</Label>
      <Input type="text" name="make" onChange={props.onChange} />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="model">Model:</Label>
      <Input type="text" name="model" onChange={props.onChange} />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="year">Year:</Label>
      <Input type="text" name="year" onChange={props.onChange} />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="color">Color:</Label>
      <Input type="text" name="color" onChange={props.onChange} />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="license_plate">License Plate:</Label>
      <Input type="text" name="license_plate" onChange={props.onChange} />
    </FormGroup>
  </Form>
);

export default VehicleForm;
