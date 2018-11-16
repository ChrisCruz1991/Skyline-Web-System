import React, { Component } from "react";
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

class Clients extends Component {

  handleClick(id) {
    console.log('Funciona', id)
  }

  render() {
    const { clients } = this.props.clients;
    const listTable = clients.length ? (
      clients.map(client => {
        return (
          <tr key={client.id}>
            <td>{client.firstName}</td>
            <td>{client.lastName}</td>
            <td>{client.phone}</td>
            <td>{client.direccion}</td>
          </tr>
        )
      })
    ) : (
        <tr><td>No Data..</td></tr>
    )

    return (
      <div className="App">
        <h2 className="text-center pt-3">This is all the vehicle in taller</h2>
        <p className="text-center pb-3">Click on the links to be taken to a different part of the app!</p>
        <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Direccion</th>
          </tr>
        </thead>
        <tbody>
          {listTable}
        </tbody>
      </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clients: state.clients
  }
}

export default connect(mapStateToProps)(Clients);
