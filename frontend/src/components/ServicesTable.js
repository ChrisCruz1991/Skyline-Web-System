import React, { Component } from "react";

class ServicesTable extends Component {
  render() {
    const { id, services, total } = this.props.service;
    return (
      <tr>
        <td>{id}</td>
        <td>{services}</td>
        <td>${total}</td>
      </tr>
    );
  }
}

export default ServicesTable;
