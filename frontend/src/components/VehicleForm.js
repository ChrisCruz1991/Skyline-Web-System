import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

const VehicleForm = props => (
  <Form>
    <FormGroup>
      <Label htmlFor="make">Make:</Label>
      <Input
        type="text"
        name="make"
        onChange={props.onChange}
        placeholder="Toyota"
      />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="model">Model:</Label>
      <Input
        type="text"
        name="model"
        onChange={props.onChange}
        placeholder="Corolla"
      />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="year">Year:</Label>
      <Input
        type="text"
        name="year"
        onChange={props.onChange}
        placeholder="2005"
      />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="color">Color:</Label>
      <Input
        type="text"
        name="color"
        onChange={props.onChange}
        placeholder="yellow"
      />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="license_plate">License Plate:</Label>
      <Input
        type="text"
        name="license_plate"
        onChange={props.onChange}
        placeholder="AAA-000"
      />
    </FormGroup>
  </Form>
);

export default VehicleForm;
