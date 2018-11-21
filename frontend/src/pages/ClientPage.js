import React, { Component } from "react";
import axios from "axios";

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

  render() {
    const { client, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const { name, role, vehicles } = client;

    /*
      Need fixing and styling, but
      receives information properly
    */
    return (
      <div>
        <p>{name}</p>
      </div>
    );
  }
}
