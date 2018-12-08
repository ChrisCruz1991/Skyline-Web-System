import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import EmployeesTable from "../components/EmployeesTable";
import "../styles/sass/pages/EmployeeDashboard.scss";
import { getFromStorage } from "../utils/storage";

export default class EmployeesDashboard extends Component {
  state = {
    employees: [],
    isLoading: true
  };

  componentDidMount() {
    const token = getFromStorage("object");
    console.log("MAYBE TOKEN", token);
    axios
      .get("http://localhost:8080/api/employee/table", {
        headers: {
          authorization: `Bearer ${token.token}`
        }
      })
      .then(res =>
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
          This is all the employees in garage
        </h2>
        <p className="text-center pb-3">
          Click on the links to be taken to a different part of the app!
        </p>
        <Table striped hover>
          <thead style={{ textAlign: "center" }}>
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
                key={employee.id}
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
        <Link to="/employees/new">
          <Button color="info">Add New Employee</Button>
        </Link>
      </div>
    );
  }
}
