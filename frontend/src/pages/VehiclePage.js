import React, { Component } from "react";
import axios from "axios";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Container,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const STATUS = {
  0: "Unattended",
  1: "Attending",
  2: "Ready"
};

export default class VehiclePage extends Component {
  state = {
    vehicle: [],
    isLoading: true,
    dropdownOpen: false,
    status: "",
    displayText: null
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:8080/api/vehicle/${id}`).then(res =>
      this.setState({
        vehicle: res.data,
        status: STATUS[res.data.data.status],
        isLoading: false
      })
    );
  }

  toggle = e => {
    console.log(e.target.value);
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  onChange = e => {
    this.setState({
      status: e.target.innerText
    });
  };

  onItemSelect = e => {
    this.setState({
      status: e.target.innerText
    });
  };

  OkButtonSubmit = () => {
    const { vehicle_id } = this.state.vehicle.data;
    const STATUS_TO_NUMBER = {
      Unattended: 0,
      Attending: 1,
      Ready: 2
    };

    const newStatusText = this.state.status;

    // Change the work from 'status' into
    // a number
    const newStatusNum = STATUS_TO_NUMBER[newStatusText];

    // post request
    axios
      .post("http://localhost:8080/api/vehicle/status", {
        status: newStatusNum,
        vehicle_id: vehicle_id
      })
      .then(res => {
        if (res.data.code === 200) {
          this.setState({
            successMessage: "Successfully updated vehicle status!",
            displayText: true
          });
        }
      });
  };

  render() {
    const { vehicle, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    const {
      client_name,
      client_last_name,
      make,
      model,
      color,
      year,
      license_plate
    } = vehicle.data;

    return (
      <Container>
        <Row>
          <h2>
            Client: {client_name} {client_last_name}
          </h2>
        </Row>
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <Label htmlFor="make">Make:</Label>
                <Input value={make} name="make" type="text" disabled />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="model">Model:</Label>
                <Input value={model} type="text" name="model" disabled />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="year">Year:</Label>
                <Input value={year} type="text" name="year" disabled />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="color">Color:</Label>
                <Input value={color} type="text" name="color" disabled />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="license_plate">License Plate:</Label>
                <Input
                  value={license_plate}
                  type="text"
                  name="license_plate"
                  disabled
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="status">Status:</Label>
                <Input
                  onChange={this.onChange}
                  value={this.state.status}
                  type="text"
                  name="status"
                />
              </FormGroup>
              <FormGroup>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle color="info" caret>
                    {this.state.status || "Status"}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.onItemSelect}>
                      Unattended
                    </DropdownItem>
                    <DropdownItem onClick={this.onItemSelect}>
                      Ready
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </FormGroup>
            </Form>
            <Button color="success" onClick={this.OkButtonSubmit}>
              Ok
            </Button>
            {this.state.displayText && (
              <div className="text-success">{this.state.successMessage}</div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
