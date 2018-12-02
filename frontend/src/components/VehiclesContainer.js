import React, { Component } from "react";
import { Col, Row, Table, Button } from "reactstrap";
import VehicleModalContent from "./VehicleModalContent";

export default class VehiclesContainer extends Component {
  state = {
    isClicked: false
  };

  clickButton = () => {
    this.setState({
      isClicked: !this.state.isClicked
    });
  };

  render() {
    const { name, vehicles, vehiclesFromGarage } = this.props;

    return (
      <Col
        className="col-md-6 mt-3"
        style={{ background: "lightgrey", borderRadius: "10px" }}
      >
        <h3 style={{ paddingTop: "15px", textAlign: "center" }}>
          List Of Vehicles Handled By {name}
        </h3>
        <Row className="pt-3">
          <Table>
            <thead>
              <tr>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Color</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map(vehicle => {
                return (
                  <tr key={vehicle.Id}>
                    <td>{vehicle.Make}</td>
                    <td>{vehicle.Model}</td>
                    <td>{vehicle.Year}</td>
                    <td style={{ textTransform: "capitalize" }}>
                      {vehicle.Color}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
        <Row>
          <Button onClick={this.clickButton} color="info" size="lg" block>
            Add Vehicle
          </Button>
          {this.state.isClicked && (
            <VehicleModalContent
              assignVehicle={this.props.assignVehicle}
              vehicles={vehiclesFromGarage}
            />
          )}
        </Row>
      </Col>
    );
  }
}
