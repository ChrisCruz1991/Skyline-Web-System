import React, { Component } from "react";
import axios from "axios";
import { getFromStorage } from "../utils/storage";
import { Table } from "reactstrap";
import ServicesCreate from "../components/ServicesCreate";

class ServicesNew extends Component {
  state = {
    vehicles: []
  };
  componentDidMount() {
    const storage = getFromStorage("object");
    axios
      .get(
        `http://localhost:8080/api/services/notrelation/
        ${storage.results.garage_id}`
      )
      .then(res =>
        this.setState({
          vehicles: res.data
        })
      );
  }
  createService(vehicle, id) {
    this.props.history.push(`servicescreate/${id}`);
  }

  render() {
    const vehicles = this.state.vehicles;
    let newVehicles = vehicles.filter(service => service.status === 2);
    console.log(vehicles);
    console.log("rendering");
    return (
      <div className="mt-3">
        <h2>Vehciles Ready to have ticket</h2>
        <Table className="mt-3">
          <thead>
            <th>Make</th>
            <th>Model</th>
            <th>year</th>
            <th>Status</th>
            <th>Owner</th>
          </thead>
          <tbody>
            {newVehicles.map(newVehicle => (
              <tr
                onClick={() =>
                  this.createService(newVehicle, newVehicle.vehicle_id)
                }>
                <th>{newVehicle.make}</th>
                <th>{newVehicle.model}</th>
                <th>{newVehicle.year}</th>
                <th>{newVehicle.status}</th>
                <th>owner</th>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ServicesNew;
