import React, { Component } from "react";
import Header from "./components/Header";
import Users from "./components/Users";
import Vehicles from "./components/Vehicles";

class App extends Component {
  render() {
    return (
      <div className="App">
<<<<<<< HEAD
        <Header />
        <Users />
        <Vehicles />
=======
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Users With Dervin and Christopher</h1>
        </header>
        {this.state.users.map(user => (
          <div key={user.id}>{user.username}</div>
        ))}
>>>>>>> 24387779ba3ebd28bf019317307dfe54377189bb
      </div>
    );
  }
}

export default App;
