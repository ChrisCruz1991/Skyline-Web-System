import React, { Component } from "react";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import { stat } from "fs";

const STATUSES = {
  0: "Unattended",
  1: "Attending",
  2: "Ready"
};

const STATUSES_COLORS = {
  0: "#800020",
  1: "#cf5300",
  2: "#0b6623"
};

class ServicesTable extends Component {
  SpecificClicked = id => {
    this.props.history.push("/service/" + id);
  };

  render() {
    const {
      service_id,
      services,
      total,
      make,
      model,
      year,
      firstName,
      lastName,
      status
    } = this.props.service;

    const vehicle_status = STATUSES[status];
    const vehicle_color = STATUSES_COLORS[status];
    return (
      <tr onClick={() => this.SpecificClicked(service_id)}>
        <td>
          {year} {make} {model}
        </td>
        <td>
          {firstName} {lastName}
        </td>
        <td>{services}</td>
        <td>${total}</td>
        <td>
          <span
            style={{
              backgroundColor: vehicle_color,
              borderRadius: "25px",
              padding: "10px 20px",
              color: "white"
            }}>
            {vehicle_status}
          </span>
        </td>
      </tr>
    );
  }
}

export default withRouter(ServicesTable);
