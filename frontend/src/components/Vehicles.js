import React, { Component } from "react";
import Vehicle from "./Vehicle";
import axios from "axios";

export default class Vehicles extends Component {
  state = { vehicles: [] };

  componentDidMount() {
    axios.get("/vehicles").then(res => {
      this.setState({ vehicles: res.data });
    });
  }

  render() {
    return (
      <div>
        <h2>List of Cars</h2>
        {this.state.vehicles.map(vehicle => (
          <Vehicle
            key={vehicle.vin_num}
            make={vehicle.make}
            model={vehicle.model}
            year={vehicle.year}
          />
        ))}
      </div>
    );
  }
}
