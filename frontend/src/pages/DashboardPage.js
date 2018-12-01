import React, { Component } from "react";
import DashboardTable from "../components/DashboardTable";
import { Table } from "reactstrap";
import axios from "axios";
import { getFromStorage } from "../utils/storage";

export default class Dashboard extends Component {
  state = {
    vehicles: [],
    isLoading: true
  };

  componentDidMount() {
    const { garage_id } = getFromStorage("object");
    axios
      .get("http://localhost:8080/api/vehicle/dashboard/" + garage_id)
      .then(res =>
        this.setState({
          vehicles: res.data,
          isLoading: false
        })
      );
  }

  render() {
    const { vehicles, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading data...</p>;
    }

    return (
      <div className="App">
        <h2 className="text-center pt-3">This is all the vehicles in garage</h2>
        <p className="text-center pb-3">
          Click on the links to be taken to a different part of the app!
        </p>
        <Table striped>
          <thead>
            <tr>
              <th>Client</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Color</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <DashboardTable
                key={vehicle.id}
                id={vehicle.id}
                name={vehicle.Name}
                make={vehicle.Make}
                model={vehicle.Model}
                color={vehicle.Color}
                year={vehicle.Year}
                status={vehicle.Status}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
