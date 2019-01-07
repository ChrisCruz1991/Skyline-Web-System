import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { getFromStorage } from "../utils/storage";
import { Table, Button } from "reactstrap";
import ServicesTable from "../components/ServicesTable";
import { Link } from "react-router-dom";

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

  goToService = e => {
    this.props.history.push(`/service/new`);
  };

  render() {
    const { services } = this.state;
    console.log("services", services);

    let newServices = services.filter(service => service.status === 2);

    console.log("SERVICES", newServices);

    return (
      <div className="text-center mt-4">
        <h3>All Service Ticket in your Garage</h3>
        <Button>
          <Link className="text-white" to="/services/new">
            Add New Service
          </Link>
        </Button>
        {newServices.length ? (
          <Table className="mt-4">
            <thead>
              <th>Vehicle</th>
              <th>Owner</th>
              <th>Services</th>
              <th>Total</th>
              <th>Status</th>
            </thead>
            <tbody>
              {newServices.length &&
                newServices.map(service => <ServicesTable service={service} />)}
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
