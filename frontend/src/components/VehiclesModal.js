import React, { Component } from "react";
import VehicleModalContent from "./VehicleModalContent";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class VehicleModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            Vehicles without employee
          </ModalHeader>
          <ModalBody>
            Generate Table of all the cars with no relations with employee
            <VehicleModalContent />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Do Something
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Button
          style={{
            fontSize: "20px"
          }}
          color="info"
          size="lg"
          block
          onClick={this.toggle}
        >
          Add Vehicle
        </Button>
      </div>
    );
  }
}
