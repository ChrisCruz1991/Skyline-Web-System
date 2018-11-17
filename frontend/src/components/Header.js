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
          <NavbarBrand className="text-white">
            Mech-2-Tech Dashboard
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="my-auto mx-2">
                <Link to="/employee" className="text-white my-3">Employee's</Link>
              </NavItem>
              <NavItem className="my-auto mx-2">
                <Link to="/clients" className="text-white ">Client's</Link>
              </NavItem>
              <NavItem className="my-auto mx-2">
                <Link to="/vehicle" className="text-white ">Vehicle's</Link>
              </NavItem>
              <NavItem className="my-auto mx-2">
                <Link to="/" className="text-white ">Service's</Link>
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
