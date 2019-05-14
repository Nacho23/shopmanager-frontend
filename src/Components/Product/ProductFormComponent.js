import React, { Component } from 'react';
import {
    Form, Table,
    CardBody, Collapse,
    Button, Row, Col,
    FormGroup, Label, Input,
    InputGroup, InputGroupAddon,
    InputGroupText,
} from 'reactstrap';
import CurrencyInput from 'react-currency-input';

export default class ProductFormComponent extends Component {
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
                    <small>Código producto</small>
                    <InputGroup>
                        <Input type="text" className="form-control form-control-sm" placeholder="XXXXXXXXXXX"
                            onChange={(e) => this.onChangeValue('code', e.target.value)}></Input>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <small>Nombre producto</small>
                    <InputGroup>
                        <Input type="text" className="form-control form-control-sm" placeholder="" ></Input>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <small>Proveedor</small>
                    <InputGroup>
                        <Input type="select" className="form-control form-control-sm" >
                            <option value="">producto 1</option>
                        </Input>
                    </InputGroup>
                </FormGroup>
                <Row>
                    <Col>
                        <FormGroup>
                            <small>Precio unitario</small>
                            <InputGroup>
                                <InputGroupAddon addonType="append" className="inputGroup-sizing-sm">
                                    <InputGroupText><i className="fa fa-dollar"></i></InputGroupText>
                                </InputGroupAddon>
                                <CurrencyInput thousandSeparator="." precision="0" className="form-control form-control-sm" placeholder="0"
                                    selectAllOnFocus={true} />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <small>Cantidad</small>
                            <InputGroup>
                                <Input type="number" className="form-control form-control-sm" placeholder="0" ></Input>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Button className="btn-sm float-right" color="success" onClick={this.save}>Guardar</Button>
            </Form>
        );
    }
}