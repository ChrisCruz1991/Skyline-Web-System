import React from "react";
import { Col, Button, Form, FormGroup, Label, Input, FormText, Row } from 'reactstrap';

const SpecificVehicle = ({ vehicle }) => {
    return (
        vehicle.length ? (
            vehicle.map(vehicle => {
                console.log(vehicle)
                return (
                    <Row>
                        <div className="px-4 mt-3 col-md-6">
                            <Form className="">
                                <FormGroup className="" row>
                                    <Label for="make" md={2} className="">Make:</Label>
                                    <Col md={10}>
                                        <Input type="text" name="make" value={vehicle.make} disabled />
                                    </Col>
                                </FormGroup>
                                <FormGroup className="" row>
                                    <Label md={2} for="model" className="">Model:</Label>
                                    <Col md={10}>
                                        <Input type="text" name="model" value={vehicle.model} disabled />
                                    </Col>
                                </FormGroup>
                                <FormGroup className="" row>
                                    <Label md={2} for="year" className="">Year:</Label>
                                    <Col md={10}>
                                        <Input type="text" name="year" value={vehicle.year} disabled />
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="">
                                    <Label md={2} for="color" className="">Color:</Label>
                                    <Col md={10}>
                                        <Input type="text" name="color" value={vehicle.color} disabled />
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="">
                                    <Label md={2} for="license_plate" className="">License Plate:</Label>
                                    <Col md={10}>
                                        <Input type="text" name="model" value={vehicle.license_plate} disabled />
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="">
                                    <Label md={2} for="status" className="">Status:</Label>
                                    <Col md={10}>
                                        <Input type="text" name="model" value={vehicle.status} disabled />
                                    </Col>
                                </FormGroup>
                                <Button>Submit</Button>
                            </Form>
                        </div>
                        <div className="px-4 mt-3 col-md-6">
                            <h3>Please Funciona</h3>
                        </div>
                    </Row>

                    // rightLayout

                )
            })
        ) : (
                <h3>No Data....</h3>
            )
    )
}

export default SpecificVehicle