import React, { Component } from "react";
import { Table } from 'reactstrap';

class Vehicles extends Component {

  state = {
    vehicles: []
  }

  handleClick(id) {
      this.props.history.push('/vehicle/' + id);
  }

  componentDidMount() {
    fetch('http://192.168.1.115:8080/api/vehicle')
    .then(response => response.json())
    .then(data => {
      this.setState( {
        vehicles: data
      })
    })
  }

  render() {
    console.log('data from state: ', this.state.vehicles)
    const { vehicles } = this.state;
    const listTable = vehicles.length ? (
      vehicles.map(vehicle => {
        console.log(vehicle)
        return (
          <tr key={vehicle.id} onClick={() => this.handleClick(vehicle.id)}>
            <td>{vehicle.Name}</td>
            <td>{vehicle.Make}</td>
            <td>{vehicle.Model}</td>
            <td>{vehicle.Year}</td>
            <td>{vehicle.Color}</td>
          </tr>
        )
      })
    ) : (
        <tr><td>Loading Data...</td></tr>
    )

    return (
      <div className="App">
        <h2 className="text-center pt-3">All the vehicles in the Database</h2>
        <label htmlFor="search">Search for vehicle type: </label>
        <input type="text" name="search"/>
        <Table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Color</th>
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


export default Vehicles;



// componentDidMount() {
//   axios.get("/vehicles").then(res => {
//     this.setState({ vehicles: res.data });
//   });
// }
