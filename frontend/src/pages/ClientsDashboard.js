import React, { Component } from "react";
import {
  Table,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from "reactstrap";
import ClientsTable from "../components/ClientsTable";
import axios from "axios";
import { getFromStorage } from "../utils/storage";

export default class ClientsDashboard extends Component {
  state = {
    clients: [],
    clientsFilter: [],
    isLoading: true
  };
  componentDidMount() {
    const { garage_id } = getFromStorage("object");
    axios.get("http://localhost:8080/api/clients/" + garage_id).then(res =>
      this.setState({
        clients: res.data,
        isLoading: false,
        clientsFilter: res.data
      })
    );
  }

  onInputChange = e => {
    this.setState({
      clientsFilter: this.state.clients.filter(client => {
        return (
          client.Name.toLowerCase() + client.Last_Name.toLowerCase()
        ).includes(e.target.value.toLowerCase().replace(" ", ""));
      })
    });
  };

  render() {
    // Filter will be done later
    const { clientsFilter, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div className="App">
        <h2 className="text-center pt-3">
          This is all the Clients in database
        </h2>
        <InputGroup className="inputGroup mx-auto">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Search:</InputGroupText>
          </InputGroupAddon>
          <Input onChange={this.onInputChange} />
        </InputGroup>
        <br />
        <p className="text-center pb-3">
          Click on the links to be taken to a different part of the app!
        </p>
        <Table striped>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {clientsFilter.map(client => (
              <ClientsTable
                key={client.id}
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
