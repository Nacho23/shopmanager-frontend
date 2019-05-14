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

export default class ProviderFormComponent extends Component {
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
                <FormGroup>
                    <small>Nombre empresa</small>
                    <InputGroup>
                        <Input type="text" className="form-control form-control-sm" placeholder="XXXXXXXXXXX"
                            onChange={(e) => this.onChangeValue('code', e.target.value)}></Input>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <small>Nombre vendedor</small>
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
                <Row>
                    <Col>
                        <FormGroup>
                            <small>Región</small>
                            <InputGroup>
                                <Input type="select" className="form-control form-control-sm" >
                                    <option>Los Ríos</option>
                                </Input>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <small>Comuna</small>
                            <InputGroup>
                                <Input type="select" className="form-control form-control-sm" >
                                    <option>Valdivia</option>
                                </Input>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <small>Direccion</small>
                    <InputGroup>
                        <Input type="text" className="form-control form-control-sm" ></Input>
                    </InputGroup>
                </FormGroup>
                <Button className="btn-sm float-right" color="success" onClick={this.save}>Guardar</Button>
            </Form>
        );
    }
}