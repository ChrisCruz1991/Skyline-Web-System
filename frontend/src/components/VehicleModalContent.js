import React, { Component } from "react";
import { Table, Row, Button } from "reactstrap";

export default class VehicleModalContent extends Component {
  state = {
    isClicked: false,
    clicked: ""
  };

  handleClickedRow = id => {
    this.setState({
      isClicked: true,
      clicked: id
    });
  };

  getVehicleId = () => {
    this.props.assignVehicle(this.state.clicked);
  };

  render() {
    const { vehicles } = this.props;

    // to display the make and model of
    // the vehicle selected
    const vehicleClicked = vehicles.find(
      vehicle => vehicle.id === this.state.clicked
    );

    // filter the vehicle list from garage
    // with status === 0
    const vehicleFilter = vehicles.filter(vehicle => vehicle.Status === 0);

    return (
      <div>
        {this.state.isClicked ? (
          <h3>
            Selected car is: {vehicleClicked.Make} {vehicleClicked.Model}
          </h3>
        ) : (
          <h3>No Vehicle is selected</h3>
        )}
        <Table hover striped>
          <thead>
            <tr>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            {vehicleFilter.map(vehicle => {
              return (
                <tr
                  key={vehicle.id}
                  onClick={() => this.handleClickedRow(vehicle.id)}>
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
        <Row>
          <Button className="mx-auto" color="info" onClick={this.getVehicleId}>
            Assign Vehicle
          </Button>
          <Button className="mx-auto" color="danger">
            Cancel
          </Button>
        </Row>
      </div>
    );
  }
}
