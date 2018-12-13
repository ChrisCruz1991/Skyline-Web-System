import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Button } from "reactstrap";
import { getFromStorage } from "../utils/storage";
import test from "../components/generatePdf";
import FileSaver from "file-saver";

class SpecificService extends Component {
  state = {
    service: {}
  };

  componentDidMount() {
    const storage = getFromStorage("object");
    const headers = {
      headers: {
        authorization: `Bearer ${storage.token}`
      }
    };
    console.log("id", this.props.match.params.id);
    axios
      .get(
        `http://localhost:8080/api/services/${this.props.match.params.id}`,
        headers
      )
      .then(res => {
        this.setState({
          service: res.data[0]
        });
      });
  }

  createTBody(services, prices, total) {
    if (services === undefined || prices === undefined) return null;
    var serv = services.split(",");
    var cost = prices.split(",");
    const table = [];

    for (let i = 0; i < serv.length; i++) {
      table.push(
        <tr key={i}>
          <td>{serv[i]}</td>
          <td>${cost[i]}</td>
        </tr>
      );
    }

    table.push(
      <tr key={30} className="bg-success text-white ">
        <td>Total:</td>
        <td>${total}</td>
      </tr>
    );
    return table;
  }

  generatePDF(id) {
    const storage = getFromStorage("object");
    const headers = {
      headers: {
        authorization: `Bearer ${storage.token}`
      }
    };
    fetch(`http://localhost:8080/api/services/pdf/${id}`, headers).then(res => {
      FileSaver.saveAs(res.toString("base64"), "perder.pdf");
    });
  }

  render() {
    console.log(this.state.service);
    const {
      firstName,
      lastName,
      phone,
      year,
      make,
      model,
      address,
      services,
      prices,
      total
    } = this.state.service;

    return (
      <Container className="">
        <h2 className="mt-3">SERVICE TICKET</h2>
        <Row className="mt-4">
          <Col md={6} className="mt-3">
            <h2 className="pb-3 text-left">
              <pre>Information of Client</pre>
            </h2>
            <pre>
              Full Name: {firstName} {lastName}
            </pre>
            <pre>Address: {address}</pre>
            <pre>Telephone: {phone}</pre>
            <pre>
              Owner Car: {year} {make} {model}
            </pre>
          </Col>
          <Col md={6} className="pt-2">
            <Table>
              <thead>
                <tr className="text-white bg-success">
                  <th>Service</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>{this.createTBody(services, prices, total)}</tbody>
            </Table>
          </Col>
        </Row>
        <div className="text-center pt-4">
          <Button
            color="primary"
            onClick={() => this.generatePDF(this.props.match.params.id)}>
            Generate Ticket
          </Button>
        </div>
      </Container>
    );
  }
}

export default SpecificService;
