import React, { Component } from "react";
import axios from "axios";
import VehicleForm from "../components/VehicleForm";
import { getFromStorage } from "../utils/storage";
import { Container, Row, Col, Button } from "reactstrap";

export default class NewVehiclePage extends Component {
  state = {
    make: "",
    model: "",
    year: "",
    color: "",
    license_plate: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: [e.target.value]
    });
  };

  onClick = () => {
    const client_id = this.props.match.params.id;
    const { garage_id } = getFromStorage("object");
    const { make, model, year, color, license_plate } = this.state;

    // post a request
    axios
      .post("http://localhost:8080/api/client/new_vehicle", {
        make,
        model,
        year,
        color,
        license_plate,
        garage_id,
        client_id
      })
      .then(res => {
        console.log(res);
      });
  };

  render() {
    return (
      <Container>
        <Row className="d-flex justify-content-center">
          <h3>Add New Vehicle</h3>
        </Row>
        <Col>
          <Row className="d-flex justify-content-center">
            <VehicleForm onChange={this.onChange} />
          </Row>
          <Row>
            <Button onClick={this.onClick} color="info">
              Add
            </Button>
            <Button color="warning">Cancel</Button>
          </Row>
        </Col>
      </Container>
    );
  }
}
