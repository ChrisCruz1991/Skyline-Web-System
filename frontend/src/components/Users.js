import React, { Component } from "react";
import User from "./User";
import axios from "axios";

export default class Users extends Component {
  state = { users: [] };

  componentDidMount() {
    axios.get("./users").then(res => {
      //   console.log(res.data);
      this.setState({ users: res.data });
    });
  }

  render() {
    return (
      <div>
        <h2>List of Users</h2>
        {this.state.users.map(user => (
          <User key={user.id} username={user.username} age={user.age} />
        ))}
      </div>
    );
  }
}
