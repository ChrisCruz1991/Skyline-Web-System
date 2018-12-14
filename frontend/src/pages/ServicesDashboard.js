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
    const storage = getFromStorage("object");
    const headers = {
      headers: {
        authorization: `Bearer ${storage.token}`
      }
    };
    axios.get("http://localhost:8080/api/services/table", headers).then(res => {
      this.setState({
        services: res.data,
        isLoading: false
      });
      console.log(res.data);
    });
  }

  render() {
    const { services } = this.state;
    console.log("services", services);

    let newServices = services.includes(service => service.status === 2);

    console.log(newServices);

    return (
      <div className="text-center mt-4">
        <h3>All Service Ticket is your Garage</h3>
        {newServices.length ? (
          <Table>
            <thead>
              <th>Vehicle</th>
              <th>Owner</th>
              <th>Services</th>
              <th>Total</th>
              <th>Status</th>
            </thead>
            <tbody>
              {services.length &&
                services.map(service => <ServicesTable service={service} />)}
            </tbody>
          </Table>
        ) : (
          <p className="text-danger"> No Vehicles is with ready status </p>
        )}
      </div>
    );
  }
}

export default ServicesDashboard;
