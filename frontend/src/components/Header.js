import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";
import { getFromStorage } from "../utils/storage";

export default class Header extends Component {
  state = {
    isOpen: false,
    name: "",
    lastName: "",
    garageName: "",
    isLoading: true
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  componentDidMount() {
    const { employee_name, employee_last_name, garage_name } = getFromStorage(
      "object"
    );
    console.log(getFromStorage("object"));
    this.setState({
      name: employee_name,
      lastName: employee_last_name,
      garageName: garage_name
    });
  }

  render() {
    const { name, lastName, garageName, isLoading } = this.state;

    return (
      <header className="header">
        <Navbar expand="md" light className="bg-info">
          <NavbarBrand className="text-white">Skyline Web-Systems</NavbarBrand>
          <NavbarToggler className="text-white" onClick={this.toggle} />
          <Collapse className="text-white" isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto " navbar>
              <NavItem className="my-auto mx-2">
                <Link to="/" className="text-white my-3">
                  Home
                </Link>
              </NavItem>
              <NavItem className="my-auto mx-2">
                <Link to="/dashboard" className="text-white my-3" />
              </NavItem>
              <NavItem>
                <Link to="/vehicle" className="text-white my-3">
                  Dashboard
                </Link>
              </NavItem>
              <NavItem className="my-auto mx-2">
                <Link to="/employees" className="text-white my-3">
                  Employees
                </Link>
              </NavItem>
              <NavItem className="my-auto mx-2">
                <Link to="/clients" className="text-white ">
                  Clients
                </Link>
              </NavItem>
              <NavItem className="my-auto mx-2">
                <Link to="/" className="text-white ">
                  Services
                </Link>
              </NavItem>
              <NavItem className="my-auto mx-2">
                <Link to="/signup" className="text-white">
                  Sign Up
                </Link>
              </NavItem>
              <NavItem className="my-auto mx-2">
                <Link to="/login" className="text-white">
                  Log In
                </Link>
              </NavItem>
              <NavItem className=" mx-2 text-white">
                <span
                  className="bg-danger"
                  style={{
                    margin: "0",
                    padding: "0",
                    padding: "12px",
                    borderRadius: "50%"
                  }}
                >
                  {name[0]}
                  {lastName[0]}
                </span>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
