import React, { Component } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import EmployeesTable from "../components/EmployeesTable";

export default class EmployeePage extends Component {
  state = {
    employees: [],
    isLoading: true
  };

  componentDidMount() {
    axios.get("http://192.168.1.252:8080/api/employee").then(res =>
      this.setState({
        employees: res.data,
        isLoading: false
      })
    );
  }

  render() {
    const { employees, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading employees...</p>;
    }
    return (
      <div className="App">
        <h2 className="text-center pt-3">
          This is all the employees in database
        </h2>
        <p className="text-center pb-3">
          Click on the links to be taken to a different part of the app!
        </p>
        <Table striped hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <EmployeesTable
                id={employee.id}
                name={employee.Name}
                lastName={employee.Last_Name}
                phone={employee.Phone}
                email={employee.Email}
                address={employee.Address}
                role={employee.Role}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
