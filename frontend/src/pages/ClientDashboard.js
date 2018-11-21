import React, { Component } from "react";
import { Table } from "reactstrap";
import ClientTable from "../components/ClientsTable";
import axios from "axios";

export default class ClientDashboard extends Component {
  state = {
    clients: [],
    isLoading: true
  };
  componentDidMount() {
    axios.get("http://localhost:8080/api/client").then(res =>
      this.setState({
        clients: res.data,
        isLoading: false
      })
    );
  }

  render() {
    const { clients, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div className="App">
        <h2 className="text-center pt-3">
          This is all the employees in database
        </h2>
        <p className="text-center pb-3">
          Click on the links to be taken to a different part of the app!
        </p>
        <Table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <ClientTable
                id={client.id}
                name={client.Name}
                lastName={client.Last_Name}
                phone={client.Phone}
                email={client.Email}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
