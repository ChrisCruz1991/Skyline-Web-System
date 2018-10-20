import React, { Component } from "react";
import Header from "./Header";
import Users from "./Users";
import Vehicles from "./Vehicles";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Users />
        <Vehicles />
      </div>
    );
  }
}

export default App;
