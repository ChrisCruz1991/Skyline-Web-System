import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ClientsTable extends Component {
  handleClick = id => {
    this.props.history.push(`/client/${id}`);
  };
  render() {
    const { id, name, lastName, phone, email } = this.props;

    return (
      <tr id={id} onClick={() => this.handleClick(id)}>
        <td>{name}</td>
        <td>{lastName}</td>
        <td>{phone}</td>
        <td>{email}</td>
      </tr>
    );
  }
}

export default withRouter(ClientsTable);
