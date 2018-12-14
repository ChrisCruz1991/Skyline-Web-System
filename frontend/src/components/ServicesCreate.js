import React, { Component } from "react";
import { Table, Container, Button } from "reactstrap";
import axios from "axios";
import { getFromStorage } from "../utils/storage";
class ServicesCreate extends Component {
  state = {
    rows: [1],
    service: [],
    cost: [],
    vehicle: {}
  };

  addService = _ => {
    const filas = this.state.rows;
    filas.push(1);
    this.setState({
      rows: filas
    });
  };

  componentDidMount() {
    axios
      .get(`http://localhost:8080/api/vehiclenew/${this.props.match.params.id}`)
      .then(res => {
        console.log(res);
        this.setState({
          vehicle: res.data[0]
        });
      });
    console.log("vehicle", this.state.vehicle);
  }

  AddScript = _ => {
    const table = document.getElementById("table-service");
    console.log("table", table);
    var services = [];
    var costs = [];

    var ser = document.getElementsByClassName("ser");
    var cos = document.getElementsByClassName("cost");

    for (var i = 0; i < ser.length; i++) {
      services.push(ser[i].value);
      costs.push(cos[i].value);
    }

    console.log("script", this.state.vehicle);

    axios
      .post(`http://localhost:8080/api/services/add`, {
        service_ticket_id: this.state.vehicle.vehicle_id,
        service_string: services.toString(),
        price_string: costs.toString(),
        total: costs.toString(),
        VEHICLE_vehicle_id: this.state.vehicle.vehicle_id,
        EMPLOYEE_employee_id: this.state.vehicle.EMPLOYEE_employee_id
      })
      .then(res => console.log(res));
  };

  render() {
    const rows = this.state.rows;

    return (
      <Container className="mt-3 text-center">
        <h2>SERVICES TO ADD</h2>
        <Table className="mt-3" id="table-service">
          <thead>
            <th>SERVICE</th>
            <th>COST</th>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr>
                <td>
                  <input className="ser" type="" />
                </td>
                <td>
                  <input className="cost" type="number" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="mx-auto">
          <Button className="mx-2" color="danger" onClick={this.addService}>
            Add Service
          </Button>
          {/* <Button className="mx-2" color="danger" onClick={this.removeService}>
            Remove Service
          </Button> */}
          <Button className="mx-2" color="info" onClick={this.AddScript}>
            Done
          </Button>
        </div>
      </Container>
    );
  }
}

export default ServicesCreate;
