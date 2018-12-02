import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default class Header extends Component {
  state = { isOpen: false };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <header className="header">
        <Navbar color="dark" light expand="md">
        <div className="d-flex align-items-center mr-2"><img src="images/skyline.png" alt="logo" width="60"/>  </div>
          <NavbarBrand className="text-white">Skyline Web-Systems</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="my-auto mx-2">
                <Link to="/" className="text-white my-3">
                  Home
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
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="text-white">
                  Nombre User
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>SIGN OUT</DropdownItem>
                  <DropdownItem>My Data</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
