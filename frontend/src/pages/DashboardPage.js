import React, { Component } from "react";
import DashboardTable from "../components/DashboardTable";
import { Table } from "reactstrap";
import axios from "axios";
import { getFromStorage } from "../utils/storage";

export default class Dashboard extends Component {
  state = {
    vehicles: [],
    isLoading: true,
    garageName: ""
  };

  componentDidMount() {
    const storage = getFromStorage("object");
    const headers = {
      headers: {
        authorization: `Bearer ${storage.token}`
      }
    };
    axios
      .get("http://localhost:8080/api/vehicle/dashboard", headers)
      .then(res =>
        this.setState({
          vehicles: res.data,
          isLoading: false,
          garageName: storage.results.garage_name
        })
      );
  }

  render() {
    const { vehicles, garageName, isLoading } = this.state;

    if (isLoading) {
      return <p className="mt-5 pt-2">Loading data...</p>;
    }

    return (
      <div className="App">
        <h2 className="text-center pt-3">{garageName} | WORKSHOP</h2>
        <p className="text-center">
          Theres {vehicles.length} vehicles in the workshop.
        </p>
        <Table striped>
          <thead>
            <tr
              style={{
                textAlign: "center"
              }}>
              <th>CLIENT</th>
              <th>MAKE</th>
              <th>MODEL</th>
              <th>YEAR</th>
              <th>COLOR</th>
              <th>STATUS</th>
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
