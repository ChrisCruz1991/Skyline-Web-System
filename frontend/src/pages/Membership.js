import React, { Component } from "react";
import axios from "axios";
import { Button, Col, Row, Container } from "reactstrap";
import ClientForm from "../components/ClientForm";
import Vehicleform from "../components/VehicleForm";
import { getFromStorage } from "../utils/storage";

export default class Membership extends Component {
  state = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    make: "",
    model: "",
    year: "",
    color: "",
    license_plate: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  onCancelClick = () => {
    console.log("Cancel something");
  };

  onRegisterClick = () => {
    const { garage_id } = getFromStorage("object");
    const {
      first_name,
      last_name,
      phone,
      email,
      address,
      make,
      model,
      year,
      color,
      license_plate
    } = this.state;

    // POST information into the db
    axios
      .post("http://localhost:8080/api/client/new", {
        first_name,
        last_name,
        phone,
        email,
        address
      })
      .then(res => {
        if (res.data.success) {
          console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });

    // POST VEHICLE INFO
    axios
      .post("http://localhost:8080/api/vehicle/new", {
        make,
        model,
        year,
        color,
        license_plate,
        garage_id
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Container>
        <h2 style={{ textAlign: "center" }}>Register New Client</h2>
        <Row>
          <Col>
            <h3 style={{ textAlign: "center" }}>Client</h3>
            <ClientForm onChange={this.onChange} />
          </Col>
          <Col>
            <h3 style={{ textAlign: "center" }}>Vehicle</h3>
            <Vehicleform onChange={this.onChange} />
          </Col>
        </Row>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <Button color="info" onClick={this.onRegisterClick}>
            Add New Client
          </Button>
          <Button color="warning" onClick={this.onCancelClick}>
            Cancel
          </Button>
        </div>
      </Container>
    );
  }
}
