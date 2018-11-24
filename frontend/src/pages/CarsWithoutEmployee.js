import React, { Component } from "react";
import { Table } from 'reactstrap'
import axios from 'axios'

export default class CarsWithoutEmployee extends Component {
    state = {
        vehicles: [],
        isLoading: true,
        isClicked: false,
        clicked: ''
    };

    componentDidMount() {
        axios.get("http://192.168.1.252:8080/api/vehicle").then(res =>
            this.setState({
                vehicles: res.data.filter(vehicle => (vehicle.Status === 0)),
                isLoading: false
            })
        );
    }

    handleClickedRow = id => {
        this.setState({
            isClicked: true,
            clicked: id
        })
    }

    render() {
        console.log(this.state.vehicles)
        const vehicleClicked = this.state.vehicles.find(vehicle => vehicle.id === this.state.clicked)
        return (
            <div style={{ overflow: 'auto', height: '200px' }}>
                <div>
                    {this.state.isClicked ? (
                        <h3>Selected car is: {vehicleClicked.Make} {vehicleClicked.Model} </h3>
                    ) : (
                            <h3>No Vehicle is clicked</h3>
                        )}
                </div>
                <Table hover striped>
                    <thead>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Year</th>
                    </thead>
                    <tbody>
                        {this.state.vehicles.map(vehicle => {
                            return (
                                <tr key={vehicle.id} onClick={() => this.handleClickedRow(vehicle.id)}>
                                    <td>{vehicle.Make}</td>
                                    <td>{vehicle.Model}</td>
                                    <td>{vehicle.Year}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}
