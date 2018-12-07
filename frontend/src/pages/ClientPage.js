import React, { Component } from "react";
import axios from "axios";
import { Table, Container, Row, Col, Button } from "reactstrap";

export default class ClientPage extends Component {
  state = {
    client: {},
    isLoading: true
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:8080/api/client/${id}`).then(res =>
      this.setState({
        client: res.data,
        isLoading: false
      })
    );
  }

  handleClick = id => {
    this.props.history.push(`/vehicle/${id}`);
  };

  onClick = id => {
    this.props.history.push(`/vehicle/new/${id}`);
  };

  render() {
    const { client, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const { vehicles } = client;

    console.log(vehicles);

    /*
  Need fixing and styling, but
  receives information properly
    */
    return (
      <Container style={{ paddingTop: "20px" }}>
        <Row>
          <h3>
            {client.name} {client.lastName}
          </h3>
        </Row>
        <Row>
          <Col>
            <Table striped>
              <thead>
                <tr>
                  <th>MAKE</th>
                  <th>MODEL</th>
                  <th>YEAR</th>
                  <th>COLOR</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map(vehicle => {
                  return (
                    <tr
                      key={vehicle.id}
                      onClick={() => this.handleClick(vehicle.id)}>
                      <td>{vehicle.Make}</td>
                      <td>{vehicle.Model}</td>
                      <td>{vehicle.Year}</td>
                      <td style={{ textTransform: "capitalize" }}>
                        {vehicle.Color}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Row>
              <Col>
                <Button
                  onClick={() => this.onClick(vehicles[0].client_id)}
                  color="info">
                  Add New Vehicle
                </Button>
              </Col>
              <Col>
                <Button color="danger">Cancel</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
