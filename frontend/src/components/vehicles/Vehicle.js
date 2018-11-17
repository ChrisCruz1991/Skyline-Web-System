import React, { Component } from "react";
import { Input, Label, FormGroup, Form, Button, Row } from 'reactstrap'
import SpecificVehicle from './SpecificVehicle'

class Vehicle extends Component {
  // DATA OF THE SPECIFIC VEHICLE::::
  // CLIENT_client_id: 1
  // EMPLOYEE_employee_id: 5
  // GARAGE_garage_id: 1
  // color: "silver"
  // license_plate: "KKK-101"
  // make: "Mitsubishi"
  // model: "Montero"
  // status: 1
  // vehicle_id: 1001
  // vehicle_in_garage: 1
  // year: 1999

  state = {
    vehicle: []
  }

  componentDidMount() {
    const id = this.props.match.params.post_id
    fetch(`http://192.168.1.115:8080/api/vehicle/${id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          vehicle: data
        })
      })
  }

  render() {
    return ( 
          <SpecificVehicle vehicle={this.state.vehicle} />
    )
  }
}

export default Vehicle;
