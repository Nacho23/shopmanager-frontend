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

export default class ServiceFormComponent extends Component {
    state = {
        code: this.props.serviceToEdit ? this.props.serviceToEdit.code : '',
        description: this.props.serviceToEdit ? this.props.serviceToEdit.description : '',
        provider_id: this.props.serviceToEdit && this.props.serviceToEdit.provider ? this.props.serviceToEdit.provider.id : '',
        price: this.props.serviceToEdit ? this.props.serviceToEdit.price : '',
        amount: this.props.serviceToEdit ? this.props.serviceToEdit.amount : '',
    }
    onChangeValue = (field, value) => {
        let state = this.state;
        state[field] = value;
        this.setState(state);
    }
    setTypeNumber = (type, value) => {
        if (value) {
            if (type != 'number') {
                return value.replace(/\./g, '');
            }
            return value;
        }
        return null;
    }
    save = () => {
        if (this.props.serviceToEdit) {
            this.props.onUpdate(this.props.serviceToEdit.id, {
                code: this.state.code,
                description: this.state.description,
                provider_id: this.state.provider_id,
                price: this.setTypeNumber(typeof this.state.price, this.state.price),
                amount: this.state.amount,
            })
        } else {
            this.props.onSave({
                code: this.state.code,
                description: this.state.description,
                provider_id: this.state.provider_id,
                price: this.setTypeNumber(typeof this.state.price, this.state.price),
                amount: this.state.amount,
            })
        }
    }
    render() {
        return (
            <Form>
                <FormGroup>
                    <small>Código producto</small>
                    <InputGroup>
                        <Input type="text" className="form-control form-control-sm" placeholder="XXXXXXXXXXX" value={this.state.code}
                            onChange={(e) => this.onChangeValue('code', e.target.value)}></Input>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <small>Nombre producto</small>
                    <InputGroup>
                        <Input type="text" className="form-control form-control-sm" placeholder="" value={this.state.description}
                            onChange={(e) => this.onChangeValue('description', e.target.value)}></Input>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <small>Proveedor</small>
                    <InputGroup>
                        <Input type="select" className="form-control form-control-sm" value={this.state.provider_id}
                            onChange={(e) => this.onChangeValue('provider_id', e.target.value)}>
                            <option value="">Seleccione proveedor</option>
                            {this.props.providers ? this.props.providers.map((element, index) => {
                                return <option value={element.id}>{element.name}</option>
                            })
                            : null}
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
                                    selectAllOnFocus={true} onChange={(value) => this.onChangeValue('price', value)} value={this.state.price}/>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <small>Cantidad</small>
                            <InputGroup>
                                <Input type="number" className="form-control form-control-sm" placeholder="0" value={this.state.amount}
                                    onChange={(e) => this.onChangeValue('amount', e.target.value)}></Input>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Button className="btn-sm float-right" color="success" onClick={this.save}>Guardar</Button>
            </Form>
        );
    }
}