import React, { Component } from "react";
import Header from "./components/Header";
import Users from "./components/Users";
import Vehicles from "./components/Vehicles";

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
