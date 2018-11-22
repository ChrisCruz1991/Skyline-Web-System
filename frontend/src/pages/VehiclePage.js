import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Label, Input, Row } from "reactstrap";
import axios from "axios";

export default class Vehicle extends Component {
  state = {
    vehicle: [],
    isLoading: true
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:8080/api/vehicle/${id}`).then(res =>
      this.setState({
        vehicle: res.data,
        isLoading: false
      })
    );
  }

  render() {
    const { vehicle, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <Row>
          <div className="px-4 mt-3 col-md-6">
            <Form className="">
              <FormGroup className="" row>
                <Label for="make" md={2} className="">
                  Make:
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    name="make"
                    value={vehicle[0].make}
                    disabled
                  />
                </Col>
              </FormGroup>
              <FormGroup className="" row>
                <Label md={2} for="model" className="">
                  Model:
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    name="model"
                    value={vehicle[0].model}
                    disabled
                  />
                </Col>
              </FormGroup>
              <FormGroup className="" row>
                <Label md={2} for="year" className="">
                  Year:
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    name="year"
                    value={vehicle[0].year}
                    disabled
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="">
                <Label md={2} for="color" className="">
                  Color:
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    name="color"
                    value={vehicle[0].color}
                    disabled
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="">
                <Label md={2} for="license_plate" className="">
                  License Plate:
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    name="model"
                    value={vehicle[0].license_plate}
                    disabled
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="">
                <Label md={2} for="status" className="">
                  Status:
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    name="model"
                    value={vehicle[0].status}
                    disabled
                  />
                </Col>
              </FormGroup>
              <Button>Edit</Button>
            </Form>
          </div>
          <div className="px-4 mt-3 col-md-6">
            <h3>Please Funciona</h3>
          </div>
        </Row>
      </div>
    );
  }
}
