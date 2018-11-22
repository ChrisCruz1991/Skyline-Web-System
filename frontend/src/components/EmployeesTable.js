import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class EmployeesTable extends Component {
  handleClick = id => {
    console.log("id from employee in employessTable", id);
    this.props.history.push(`/employee/${id}`);
  };
  render() {
    const { id, name, lastName, phone, email, address, role } = this.props;

    return (
      <tr key={id} onClick={() => this.handleClick(id)}>
        <td>{name}</td>
        <td>{lastName}</td>
        <td>{phone}</td>
        <td>{email}</td>
        <td>{address}</td>
        <td>{role}</td>
      </tr>
    );
  }
}

export default withRouter(EmployeesTable);
