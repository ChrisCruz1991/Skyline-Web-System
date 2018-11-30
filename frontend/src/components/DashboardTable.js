import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class DashboardTable extends Component {
  handleClick = id => {
    this.props.history.push(`/vehicle/${id}`);
  };

  render() {
    const { key, name, make, model, year, color, status } = this.props;

    return (
      <tr key={key} onClick={() => this.handleClick(key)}>
        <td>{name}</td>
        <td>{make}</td>
        <td>{model}</td>
        <td>{year}</td>
        <td>{color}</td>
        <td>{status}</td>
      </tr>
    );
  }
}

export default withRouter(DashboardTable);
