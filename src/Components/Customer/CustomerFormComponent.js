import React, { Component } from 'react';
import {
    Form, Table,
    CardBody, Collapse,
    Button, Row, Col,
    FormGroup, Label, Input,
    InputGroup, InputGroupAddon,
    InputGroupText,
} from 'reactstrap';
import NumberFormat from 'react-number-format';

export default class CustomerFormComponent extends Component {
    state = {
    }
    onChangeValue = (field, value) => {
        let state = this.state;
        state[field] = value;
        this.setState(state);
    }
    save = () => {
        //this.props.onSave({
        //})
    }
    render() {
        return (
            <Form>
                <Row>
                    <Col md="8">
                        <FormGroup>
                            <small>Rut</small>
                            <InputGroup>
                                <Input type="text" className="form-control form-control-sm" placeholder="11111111"
                                    onChange={(e) => this.onChangeValue('rut', e.target.value)}></Input>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <FormGroup>
                            <small>DV</small>
                            <InputGroup>
                                <Input type="text" className="form-control form-control-sm" placeholder="1"
                                    onChange={(e) => this.onChangeValue('rut_dv', e.target.value)}></Input>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <small>Nombre</small>
                    <InputGroup>
                        <Input type="text" className="form-control form-control-sm" placeholder="" ></Input>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <small>Correo electrónico</small>
                    <InputGroup>
                        <Input type="email" className="form-control form-control-sm" ></Input>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <small>Teléfono</small>
                    <InputGroup>
                        <NumberFormat format="# #### ####" placeholder="9 XXXX XXXX" className="form-control form-control-sm" />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <small>Dirección</small>
                    <InputGroup>
                        <Input type="address" className="form-control form-control-sm" ></Input>
                    </InputGroup>
                </FormGroup>
                <Button className="btn-sm float-right" color="success" onClick={this.save}>Guardar</Button>
            </Form>
        );
    }
}