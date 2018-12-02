import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class EmployeesTable extends Component {
  handleClick = id => {
    this.props.history.push(`/employee/${id}`);
  };
  render() {
    const { id, name, lastName, phone, email, address, role } = this.props;

    return (
      <tr
        style={{ textAlign: "center" }}
        key={id}
        onClick={() => this.handleClick(id)}
      >
        <td>{name}</td>
        <td>{lastName}</td>
        <td>{phone}</td>
        <td>{email}</td>
        <td>{address}</td>
        <td style={{ textTransform: "capitalize" }}>{role}</td>
      </tr>
    );
  }
}

export default withRouter(EmployeesTable);
