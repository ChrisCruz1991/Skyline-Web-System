import React, { Component } from "react";
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

class Employee extends Component {
  render() {
    const { employees } = this.props.employees;
    console.log(employees)
    const employee = employees[this.props.idEmp]

    return (
        <div>
            <div className="info">
                Funciona
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
let id = ownProps.match.params.post_id;
  return {
    employees: state.employees,
    idEmp: id
  }
}

export default connect(mapStateToProps)(Employee);
