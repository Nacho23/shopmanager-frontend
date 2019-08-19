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
        name: this.props.providerToEdit ? this.props.providerToEdit.name : '',
        email: this.props.providerToEdit ? this.props.providerToEdit.email : '',
        phone_mobile: this.props.providerToEdit ? this.props.providerToEdit.phone_mobile : '',
        address_town: this.props.providerToEdit ? this.props.providerToEdit.address_town : '',
        address_street: this.props.providerToEdit ? this.props.providerToEdit.address_street : '',
        profit_rate: this.props.providerToEdit ? this.props.providerToEdit.profit_rate : '',
        sales_representative: this.props.providerToEdit ? this.props.providerToEdit.sales_representative : '',
    }
    onChangeValue = (field, value) => {
        let state = this.state;
        state[field] = value;
        this.setState(state);
    }
    save = () => {
        if (this.props.providerToEdit) {
            this.props.onUpdate(this.props.providerToEdit.id, {
                name: this.state.name,
                email: this.state.email,
                //REVISAR REPLACE !!!!!
                phone_mobile: (this.state.phone_mobile).toString().replace(/ /g,''),
                address_town: this.state.address_town,
                address_street: this.state.address_street,
                profit_rate: this.state.profit_rate,
                sales_representative: this.state.sales_representative,
            })
        } else {
            this.props.onSave({
                name: this.state.name,
                email: this.state.email,
                phone_mobile: this.state.phone_mobile !== '' ? (this.state.phone_mobile).replace(/ /g,'') : null,
                address_town: this.state.address_town,
                address_street: this.state.address_street,
                profit_rate: this.state.profit_rate,
                sales_representative: this.state.sales_representative,
            })
        }
    }
    render() {
        return (
            <Form>
                <FormGroup>
                    <small>Nombre empresa</small>
                    <InputGroup>
                        <Input type="text" className="form-control form-control-sm" value={this.state.name}
                            onChange={(e) => this.onChangeValue('name', e.target.value)}></Input>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <small>Nombre vendedor</small>
                    <InputGroup>
                        <Input type="text" className="form-control form-control-sm" placeholder="" value={this.state.sales_representative}
                            onChange={(e) => this.onChangeValue('sales_representative', e.target.value)}></Input>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <small>Correo electrónico</small>
                    <InputGroup>
                        <Input type="email" className="form-control form-control-sm" value={this.state.email} placeholder="correo@dominio.cl"
                            onChange={(e) => this.onChangeValue('email', e.target.value)}></Input>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <small>Teléfono</small>
                    <InputGroup>
                        <NumberFormat format="# #### ####" placeholder="9 XXXX XXXX" className="form-control form-control-sm"
                            value={this.state.phone_mobile} onChange={(e) => this.onChangeValue('phone_mobile', e.target.value)}/>
                    </InputGroup>
                </FormGroup>
                <Row>
                    <Col>
                        <FormGroup>
                            <small>Región</small>
                            <InputGroup>
                                <Input type="select" className="form-control form-control-sm" value={this.state.region}
                                    onChange={(e) => this.onChangeValue('region', e.target.value)} >
                                    <option>Los Ríos</option>
                                </Input>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <small>Comuna</small>
                            <InputGroup>
                                <Input type="select" className="form-control form-control-sm" value={this.state.address_town}
                                    onChange={(e) => this.onChangeValue('address_town', e.target.value)} >
                                    <option>Valdivia</option>
                                </Input>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <small>Direccion</small>
                    <InputGroup>
                        <Input type="text" className="form-control form-control-sm" value={this.state.address_street}
                            onChange={(e) => this.onChangeValue('address_street', e.target.value)}></Input>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <small>Porcentaje de ganancia</small>
                    <InputGroup>
                        <Input type="number" className="form-control form-control-sm" value={this.state.profit_rate}
                            onChange={(e) => this.onChangeValue('profit_rate', e.target.value)}></Input>
                    </InputGroup>
                </FormGroup>
                <Button className="btn-sm float-right" color="success" onClick={this.save}>Guardar</Button>
            </Form>
        );
    }
}