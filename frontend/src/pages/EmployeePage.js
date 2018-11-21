import React, { Component } from "react";
import axios from "axios";

export default class EmployeePage extends Component {
  state = {
    employee: {},
    isLoading: true
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    console.log("Id from employee", id);
    axios.get(`http://localhost:8080/api/employee/${id}`).then(res =>
      this.setState({
        employee: res.data,
        isLoading: false
      })
    );
    console.log("data from state in employeepage", this.state.employee);
  }

  render() {
    const { employee, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const { name, role, vehicles } = employee;

    /*
      Need fixing and styling, but
      receives information properly
    */
    return (
      <div>
        <p>{name}</p>
        <p>{role}</p>
        <p>{vehicles[0].Make}</p>
        <p>{vehicles[0].Model}</p>
        <p>{vehicles[0].Year}</p>
      </div>
    );
  }
}
