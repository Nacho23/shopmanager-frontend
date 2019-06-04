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
        first_name: this.props.customerToEdit ? this.props.customerToEdit.first_name : '',
        last_name: this.props.customerToEdit ? this.props.customerToEdit.last_name : '',
        rut: this.props.customerToEdit ? this.props.customerToEdit.rut : '',
        rut_dv: this.props.customerToEdit ? this.props.customerToEdit.rut_dv : '',
        email: this.props.customerToEdit ? this.props.customerToEdit.email : '',
        phone_mobile: this.props.customerToEdit ? this.props.customerToEdit.phone_mobile : '',
        address: this.props.customerToEdit ? this.props.customerToEdit.address : '',
    }
    onChangeValue = (field, value) => {
        let state = this.state;
        state[field] = value;
        this.setState(state);
    }
    save = () => {
        if (this.props.customerToEdit) {
            this.props.onUpdate(this.props.customerToEdit.id, {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                rut: this.state.rut,
                rut_dv: this.state.rut_dv,
                email: this.state.email,
                phone_mobile: this.state.phone_mobile,
                address: this.state.address,
            })
        } else {
            this.props.onSave({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                rut: this.state.rut,
                rut_dv: this.state.rut_dv,
                email: this.state.email,
                phone_mobile: this.state.phone_mobile,
                address: this.state.address,
            })
        }
    }
    render() {
        return (
            <Form>
                <Row>
                    <Col md="8">
                        <FormGroup>
                            <small>Rut</small>
                            <InputGroup>
                                <Input value={this.state.rut} type="text" className="form-control form-control-sm" placeholder="11111111"
                                    onChange={(e) => this.onChangeValue('rut', e.target.value)}></Input>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <FormGroup>
                            <small>DV</small>
                            <InputGroup>
                                <Input value={this.state.rut_dv} type="text" className="form-control form-control-sm" placeholder="1"
                                    onChange={(e) => this.onChangeValue('rut_dv', e.target.value)}></Input>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <FormGroup>
                            <small>Nombre</small>
                            <InputGroup>
                                <Input value={this.state.first_name} type="text" className="form-control form-control-sm" placeholder=""
                                    onChange={(e) => this.onChangeValue('first_name', e.target.value)}></Input>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                            <small>Apellido</small>
                            <InputGroup>
                                <Input value={this.state.last_name} type="text" className="form-control form-control-sm" placeholder=""
                                    onChange={(e) => this.onChangeValue('last_name', e.target.value)}></Input>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <small>Correo electrónico</small>
                    <InputGroup>
                        <Input value={this.state.email} type="email" className="form-control form-control-sm" placeholder="correo@dominio.cl"
                            onChange={(e) => this.onChangeValue('email', e.target.value)}></Input>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <small>Teléfono</small>
                    <InputGroup>
                        <NumberFormat value={this.state.phone_mobile} format="# #### ####" placeholder="9 XXXX XXXX" className="form-control form-control-sm"
                            onChange={(e) => this.onChangeValue('phone_mobile', e.target.value)}/>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <small>Dirección</small>
                    <InputGroup>
                        <Input value={this.state.address} type="address" className="form-control form-control-sm"
                            onChange={(e) => this.onChangeValue('address', e.target.value)}></Input>
                    </InputGroup>
                </FormGroup>
                <Button className="btn-sm float-right" color="success" onClick={this.save}>Guardar</Button>
            </Form>
        );
    }
}