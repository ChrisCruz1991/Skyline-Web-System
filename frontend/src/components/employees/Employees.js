import React, { Component } from "react";
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

class Employees extends Component {

  handleClick(id) {
    console.log(id)
    this.props.history.push('/employee/' + id)
  }

  render() {
    const { employees } = this.props.employees;
    const listTable = employees.length ? (
      employees.map(employee => {
        return (
          <tr key={employee.id} onClick={() => this.handleClick(employee.id)}>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.phone}</td>
            <td>{employee.address}</td>
            <td>{employee.salary}</td>
          </tr>
        )
      })
    ) : (
        <tr><td>No Data..</td></tr>
    )

    return (
      <div className="App">
        <h2 className="text-center pt-3">This is all the Employees in taller</h2>
        <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {listTable}
        </tbody>
      </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employees: state.employees
  }
}

export default connect(mapStateToProps)(Employees);
