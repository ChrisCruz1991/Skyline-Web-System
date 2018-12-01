import React, { Component } from "react";
import axios from "axios";
import { Table, Container, Row } from "reactstrap";
import VehiclesModal from "../components/VehiclesModal";

export default class EmployeePage extends Component {
  state = {
    employee: [],
    isLoading: true
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:8080/api/employee/${id}`).then(res =>
      this.setState({
        employee: res.data,
        isLoading: false
      })
    );
  }

  render() {
    const { employee, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const { name, vehicle_id, role, vehicles, phone, address } = employee;

    /*
      Need fixing and styling, but
      receives information properly
    */

    return (
      <Container>
        <Row>
          <div className="col-md-6 mt-3">
            <h3 className="">{name}</h3>
            <p>Role: {role}</p>
            <p>Phone Number: {phone}</p>
            <p>Address: {address}</p>
          </div>
          <div
            className="col-md-6 mt-3"
            style={{ background: "lightgrey", borderRadius: "10px" }}
          >
            <h3 style={{ paddingTop: "15px", textAlign: "center" }}>
              List Of Vehicles Handled By {name}
            </h3>
            <div style={{ borderColor: "transparent" }}>
              <VehiclesModal />
            </div>
            <div className="pt-3">
              <Table>
                <thead>
                  <tr>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map(vehicle => {
                    return (
                      <tr key={vehicle_id}>
                        <td>{vehicle.Make}</td>
                        <td>{vehicle.Model}</td>
                        <td>{vehicle.Year}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </Row>
      </Container>
    );
  }
}
