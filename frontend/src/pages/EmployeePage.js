import React, { Component } from "react";
import axios from "axios";
import {
  Table, InputGroup, InputGroupText, InputGroupAddon, Input,
  Container, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import CarsWithOutEmployee from './CarsWithoutEmployee'


export default class EmployeePage extends Component {
  state = {
    employee: [],
    isLoading: true,
    modal: false
  };

  toggle = this.toggle.bind(this);

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    console.log("Id from employee", id);
    axios.get(`http://172.20.10.2:8080/api/employee/${id}`).then(res =>
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

    const { name, role, vehicles, phone, address } = employee;
    console.log('this is the employee', employee)

    /*
      Need fixing and styling, but
      receives information properly
    */
    return (
      <Container>
        <Row>
          <div className="col-md-6 mt-3">
            <h3 className="">{name}</h3>
            <p>Role: {role}</p>
            <p>Phone Number: {phone}</p>
            <p>Address: {address}</p>
          </div>
          <div className="col-md-6 mt-3" style={{ background: 'lightgrey' }}>
            <h3>List of cars handle by employee</h3>
            {/* <div style={{position: 'absolute', top: '0', right: '40px', fontSize: '30px', borderColor: 'transparent'}}>
              <button style={{background: 'transparent'}}>+</button>
            </div> */}
            <div style={{ borderColor: 'transparent' }}>
              <Button style={{ background: 'transparent', fontSize: '20px'}}  className="" onClick={this.toggle}>Add Vehicle</Button>
              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Vehicles without employee</ModalHeader>
                <ModalBody>
                  Generate Table of all the cars with no relations with employee
                  <CarsWithOutEmployee />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
            <div className="pt-3"> 
              <Table>
                <thead>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Year</th>
                </thead>
                <tbody>
                  {vehicles.map(vehicle => {
                    return (
                      <tr>
                        <td>{vehicle.Make}</td>
                        <td>{vehicle.Model}</td>
                        <td>{vehicle.Year}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </Row>
      </Container>
    );
  }
}
