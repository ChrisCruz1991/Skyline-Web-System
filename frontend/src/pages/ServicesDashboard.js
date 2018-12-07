import React, { Component } from "react";
import axios from "axios";
import { getFromStorage } from "../utils/storage";
import { Table } from "reactstrap";
import ServicesTable from "../components/ServicesTable";

class ServicesDashboard extends Component {
  state = {
    services: [],
    isLoading: true
  };
  componentDidMount() {
    const { garage_id } = getFromStorage("object");
    axios
      .get("http://localhost:8080/api/services/table/" + garage_id)
      .then(res => {
        this.setState({
          services: res.data,
          isLoading: false
        });
        console.log(res.data);
      });
  }

  render() {
    const { services } = this.state;
    return (
      <div>
        <h3>All Service Ticket is your Garage</h3>
        <Table>
          <thead>
            <th>Service Ticket ID</th>
            <th>Services</th>
            <th>Total</th>
          </thead>
          <tbody>
            {services.map(service => (
              <ServicesTable service={service} />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ServicesDashboard;
