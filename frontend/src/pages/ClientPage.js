import React, { Component } from "react";
import axios from "axios";
import { Table, Container, Row } from "reactstrap";

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

  render() {
    const { client, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const { vehicles } = client;

    /*
      Need fixing and styling, but
      receives information properly
    */
    return (
      <div>
        <h3 className="text-center mt-3">
          {client.name} {client.lastName}
        </h3>
        <Container>
          <Row>
            <div className="col-md-6 pt-3">Informacion del vehiculo</div>
            <div className="col-md-6 pt-3">
              <h4 className="text-center pb-2">
                Client have {client.vehicles.length} vehicles in total
              </h4>
              <Table>
                <thead>
                  <tr>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Color</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map(vehicle => {
                    return (
                      <tr
                        key={vehicle.id}
                        onClick={() => this.handleClick(vehicle.id)}
                      >
                        <td>{vehicle.Make}</td>
                        <td>{vehicle.Model}</td>
                        <td>{vehicle.Year}</td>
                        <td>{vehicle.Color}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}
