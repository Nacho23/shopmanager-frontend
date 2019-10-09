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
import util from '../../Util/util';

export default class CustomerPayDebtComponent extends Component {
    state = {
        amount: 0,
        change: 0,
    }
    onChangeValue = (value) => {
        this.setState({
            amount: value,
        }, () => {
            let change = this.props.customerToPay.debt - this.setTypeNumber(typeof this.state.amount, this.state.amount);
            this.setState({
                change: change * -1,
            })
        })
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
    pay = () => {
        if (this.props.customerToPay) {
            this.props.onPay(this.props.customerToPay.id, {
                first_name: this.props.customerToPay.first_name,
                last_name: this.props.customerToPay.last_name,
                rut: this.props.customerToPay.rut,
                rut_dv: this.props.customerToPay.rut_dv,
                email: this.props.customerToPay.email,
                phone_mobile: this.props.customerToPay.phone_mobile,
                address: this.props.customerToPay.address,
                paying_debt: true,
                user_uuid: localStorage.getItem('user_uuid'),
                debt: this.props.customerToPay.debt - this.setTypeNumber(typeof this.state.amount, this.state.amount),
            })
        }
    }
    render() {
        return (
            <Form>
                {this.props.customerToPay.first_name || this.props.customerToPay.last_name ?
                    <div>
                        <Row>
                            <Col>
                                <span>Cliente: {this.props.customerToPay.first_name + ' ' + this.props.customerToPay.last_name}</span>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <h5>Monto deuda: {this.props.customerToPay && this.props.customerToPay.debt !== 0 ? util.formatMoney(this.props.customerToPay.debt) : 'No tiene deuda'}</h5>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <FormGroup>
                                    <small>Monto a pagar</small>
                                    <InputGroup>
                                        <InputGroupAddon addonType="append" className="inputGroup-sizing-sm">
                                            <InputGroupText><i className="fa fa-dollar"></i></InputGroupText>
                                        </InputGroupAddon>
                                        <CurrencyInput thousandSeparator="." precision="0" className="form-control form-control-sm" placeholder="0"
                                            selectAllOnFocus={true} onChange={(value) => this.onChangeValue(value)} value={this.state.amount}/>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                {this.state.change > 0 ? <h5>Vuelto: {util.formatMoney(this.state.change)}</h5> : null}
                            </Col>
                        </Row>
                        <Button className="btn-sm float-right" color="success" onClick={this.pay}>Pagar</Button>
                    </div>
                :
                    <Row>
                        <Col className="text-center">
                            Ingrese los datos del cliente antes de abonar
                        </Col>
                    </Row>
                }
            </Form>
        );
    }
}