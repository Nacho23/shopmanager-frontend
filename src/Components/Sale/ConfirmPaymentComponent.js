import React, { Component } from 'react';
import {
    Card, Table,
    CardBody, Collapse,
    Button, Row, Col,
    FormGroup, Label, Input,
    InputGroup, InputGroupAddon,
    Tooltip,
} from 'reactstrap';
import util from '../../Util/util';

export default class ConfirmPaymentComponent extends Component {
    state = {
        collapseExist: false,
        collapseNotExist: false,
        searchCustomer: '',
        invalidRut: false,
        changeAmount: 0,
        checked: false,
        currentCustomer: null,
    }
    componentDidUpdate = (prevProps) => {
        if (prevProps.customerFinded && prevProps.customerFinded.length == 0 && this.props.customerFinded.length !== 0) {
            console.log('asdasd', this.props.customerFinded)
        }
        if (!prevProps.customerFinded && this.props.customerFinded) {
            if (this.props.customers.length == 0) {
                this.setState({
                    collapseNotExist: true,
                    collapseExist: false,
                    rut: this.state.searchCustomer,
                })
            } else if (this.props.customers.length > 0) {
                this.setState({
                    collapseNotExist: false,
                    collapseExist: true,
                    currentCustomer: this.props.customers[0],
                })
            }
        } else if (!prevProps.customerCreated && this.props.customerCreated) {
            this.setState({
                collapseNotExist: false,
                collapseExist: true,
                currentCustomer: this.props.customer,
            })
        }
    }
    getInputValidation = (field) => {
        let props = {};
        if (this.props.customerError && this.props.customerError.getFields()[field]) {
            props.invalid = true;
        }
        return props;
    }
    onChangeValue = (field, value) => {
        let state = this.state;
        state[field] = value;
        this.setState(state);
    }
    checkedToPay = (e) => {
        this.setState({ invalidRut: false, checked: e.target.checked })
        if (e.target.checked) {
            if (this.state.searchCustomer === '') {
                this.setState({ invalidRut: true, })
            }
        }
    }
    getChangeAmount = (e) => {
        if (e.target.value !== '') {
            this.setState({
                changeAmount: (parseInt(this.props.total) - parseInt(e.target.value)) * -1 ,
            })
        } else {
            this.setState({
                changeAmount: 0,
            })
        }
    }
    searchUser = (e) => {
        if (this.state.searchCustomer !== '') {
            this.props.onSearchCustomer(this.state.searchCustomer);
        } else {
            this.setState({
                collapseNotExist: false,
                collapseExist: false,
            })
        }
    }
    pay = () => {
        this.setState({ invalidRut: false });
        if (this.state.checked && this.state.searchCustomer === '') {
            this.setState({ invalidRut: true });
        }
        this.props.onPay({
            checked: this.state.checked,
            rutCustomer: this.state.currentCustomer ? this.state.currentCustomer.rut : this.state.searchCustomer,
        })
    }
    saveClient = () => {
        this.props.onSaveClient({
            rut: this.state.rut,
            rut_dv: this.state.rut_dv,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
        })
    }
    render() {
        return (
            <Card>
                <CardBody>
                    <Row>
                        <Col className="text-center">
                            <h5>Confirmación de la compra</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table responsive size="sm">
                                <thead>
                                    <th>N° productos</th>
                                    <th align="right">Importe</th>
                                </thead>
                                <tbody>
                                    {this.props.arrayServicesToBuy ? this.props.arrayServicesToBuy.map((element, index) => {
                                        return <tr>
                                            <td>{element.amountToBuy} {element.description}</td>
                                            <td align="right">{util.formatMoney(element ? (element.price * element.amountToBuy) : 0)}</td>
                                        </tr>
                                    })
                                    : null}
                                    <tr>
                                        <td colSpan="2" align="right" style={{fontSize: '18px'}}><strong>{util.formatMoney(this.props.total)}</strong></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                        <Col>
                            <Input type="text" className="form-control form-control-sm" placeholder="Rut cliente (sin digito verificador)"
                                onChange={(e) => this.onChangeValue('searchCustomer', e.target.value)} invalid={this.state.invalidRut}
                                onBlur={(e) => this.searchUser(e)}></Input>
                            <FormGroup check className="my-2">
                                <Label check>
                                    <Input type="checkbox" onClick={(e) => this.checkedToPay(e)}/>&nbsp;por pagar
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Collapse isOpen={this.state.collapseNotExist} >
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col className="text-center">
                                                <strong>Agregar cliente</strong>
                                            </Col>
                                        </Row>
                                        <Row className="mt-2">
                                            <Col md="8">
                                                <Input type="text" className="form-control form-control-sm" placeholder="Rut"
                                                    value={this.state.rut} onChange={(e) => this.onChangeValue('rut', e.target.value)}></Input>
                                            </Col>
                                            <Col md="4">
                                                <Input type="text" className="form-control form-control-sm" placeholder="DV"
                                                    onChange={(e) => this.onChangeValue('rut_dv', e.target.value)}></Input>
                                            </Col>
                                        </Row>
                                        <Row className="mt-1">
                                            <Col>
                                                <Input type="text" className="form-control form-control-sm" placeholder="Nombre"
                                                    onChange={(e) => this.onChangeValue('first_name', e.target.value)}></Input>
                                            </Col>
                                        </Row>
                                        <Row className="mt-1">
                                            <Col>
                                                <Input type="text" className="form-control form-control-sm" placeholder="Apellido"
                                                    onChange={(e) => this.onChangeValue('last_name', e.target.value)}></Input>
                                            </Col>
                                        </Row>
                                        <Row className="mt-1">
                                            <Col>
                                                <Button color="primary" size="sm" onClick={this.saveClient}>Crear cliente</Button>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Collapse>
                            <Collapse isOpen={this.state.collapseExist} >
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col className="text-center">
                                                <strong>Datos del cliente</strong>
                                            </Col>
                                        </Row>
                                        <Row className="mt-1">
                                            <Col md="6">
                                                <strong>Nombre</strong>
                                            </Col>
                                            <Col md="6">
                                                {this.state.currentCustomer ? this.state.currentCustomer.first_name + ' ' + this.state.currentCustomer.last_name : null}
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col md="4">
                            <Input type="number" className="form-control" placeholder="IMPORTE"
                                onChange={(e) => this.getChangeAmount(e)}></Input>
                        </Col>
                        <Col md="8" className="text-right">
                            <h3>Vuelto: {util.formatMoney(this.state.changeAmount)}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className="btn-block p-3 mt-3" color="success" size="sm" onClick={this.pay}>PAGAR</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        );
    }
}