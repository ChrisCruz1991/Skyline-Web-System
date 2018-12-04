import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import VehiclesContainer from "../components/VehiclesContainer";
import { getFromStorage } from "../utils/storage";

export default class EmployeePage extends Component {
  state = {
    employee: [],
    vehicles: [],
    isLoading: true
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    const { garage_id } = getFromStorage("object");
    axios
      .all([
        axios.get(`http://localhost:8080/api/employee/${id}`),
        axios.get(`http://localhost:8080/api/vehicle/dashboard/${garage_id}`)
      ])
      .then(
        axios.spread((employee, vehicles) => {
          this.setState({
            employee: employee.data,
            vehicles: vehicles.data,
            isLoading: false
          });
        })
      );
  }

  assignVehicle = id => {
    const selectedVehicle = this.state.vehicles.find(vehicle => {
      return vehicle.id === id;
    });
    console.log("Selected vehicle: ", selectedVehicle);
    console.log("Employee id: ", this.state.employee.id);
    const vehicle_id = selectedVehicle.id;
    const employee_id = this.state.employee.id;

    // post the update into the db
    axios
      .post("http://localhost:8080/api/vehicle/update/", {
        employee_id,
        vehicle_id
      })
      .then(res => {
        if (res.data.success) {
          this.props.history.push("/");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { employee, vehicles, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const { name, role, phone, address, vehicle_list } = employee;

    /*
      Need fixing and styling, but
      receives information properly
    */

    return (
      <Container>
        <Row>
          <Col className="col-md-6 mt-3">
            <h3 className="">{name}</h3>
            <p>Role: {role}</p>
            <p>Phone Number: {phone}</p>
            <p>Address: {address}</p>
          </Col>
          <VehiclesContainer
            assignVehicle={this.assignVehicle}
            vehiclesFromGarage={vehicles}
            vehicles={vehicle_list}
            name={name}
          />
        </Row>
      </Container>
    );
  }
}
