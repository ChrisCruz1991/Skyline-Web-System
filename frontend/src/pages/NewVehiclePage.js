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
    license_plate: "",
    invalid: false
  };

  onChange = e => {
    this.setState({
      [e.target.name]: [e.target.value]
    });
  };

  invalidInput = _ => {
    this.setState({
      invalid: true
    });
  };
  onClick = () => {
    const client_id = this.props.match.params.id;
    const storage = getFromStorage("object");
    const { make, model, year, color, license_plate } = this.state;

    if (make.length < 3) {
      this.invalidInput();
      return;
    }

    if (model.length < 3) {
      this.invalidInput();
      return;
    }

    if (year.length < 4) {
      this.invalidInput();
      return;
    }
    axios
      .post("http://localhost:8080/api/client/new_vehicle", {
        make,
        model,
        year,
        color,
        license_plate,
        client_id,
        garage_id: storage.results.garage_id
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
            <Button className="mx-auto" onClick={this.onClick} color="info">
              Add
            </Button>
            <Button className="mx-auto" color="warning">
              Cancel
            </Button>
          </Row>
        </Col>
        {this.state.invalid ? (
          <p className="text-center text-danger">Funciona</p>
        ) : null}
      </Container>
    );
  }
}
