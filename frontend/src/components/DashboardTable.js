import React, { Component } from "react";
import { withRouter } from "react-router-dom";

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

class DashboardTable extends Component {
  handleClick = id => {
    this.props.history.push(`/vehicle/${id}`);
  };

  render() {
    const { id, name, make, model, year, color, status } = this.props;
    const vehicle_status = STATUSES[status];
    const vehicle_color = STATUSES_COLORS[status];

    return (
      <tr
        style={{ textAlign: "center" }}
        id={id}
        onClick={() => this.handleClick(id)}
      >
        <td>{name}</td>
        <td>{make}</td>
        <td>{model}</td>
        <td>{year}</td>
        <td style={{ textTransform: "capitalize" }}>{color}</td>
        <td>
          <span
            style={{
              backgroundColor: vehicle_color,
              borderRadius: "25px",
              padding: "10px 20px",
              color: "white"
            }}
          >
            {vehicle_status}
          </span>
        </td>
      </tr>
    );
  }
}

export default withRouter(DashboardTable);
