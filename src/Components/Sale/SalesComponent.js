import React, { Component } from 'react';
import {
    Card, Table,
    CardBody, Modal,
    Button, Row, Col,
    FormGroup, Alert, Input,
    InputGroup, ModalBody,
    Tooltip,
} from 'reactstrap';
import PaginationComponent from '../Common/PaginationComponent';
import util from '../../Util/util';
import ConfirmPaymentComponent from './ConfirmPaymentComponent';

export default class SalesComponent extends Component {
    state = {
        arrayServicesToBuy: [],
        quantityProduct: 1,
        search: '',
        serviceNotFind: false,
        total: 0,
        unitPrice: 0,
        codeSelected: '',
        descriptionSelected: '',
        confirmPayment: false,
        success: false,
    }
    componentDidUpdate = (prevProps) => {
        if (!prevProps.serviceFinded && this.props.serviceFinded) {
            if (this.props.serviceToBuy.length == 0) {
                this.setState({ serviceNotFind: true })
            } else if (this.props.serviceToBuy.length > 0) {
                this.parseService(this.props.serviceToBuy[0]);
                this.setState({
                    unitPrice: this.props.serviceToBuy[0].price,
                    descriptionSelected: this.props.serviceToBuy[0].description,
                    codeSelected: this.props.serviceToBuy[0].code,
                })
            }
        } else if (!prevProps.saleCreated && this.props.saleCreated) {
            this.cleanList();
            this.setState({
                confirmPayment: false,
                success: true,
            });
            setTimeout(() => {
                this.setState({
                    success: false,
                })
            }, 3000);
        }
    }
    onChangeValue = (field, value) => {
        let state = this.state;
        state[field] = value;
        this.setState(state);
    }
    parseService = () => {
        let arrayServicesToBuy = this.state.arrayServicesToBuy;
        if (this.state.arrayServicesToBuy.length == 0) {
            let serviceObj = {};
            serviceObj.code = this.props.serviceToBuy[0].code;
            serviceObj.description = this.props.serviceToBuy[0].description;
            serviceObj.price = this.props.serviceToBuy[0].price;
            serviceObj.amountToBuy = 1;
            serviceObj.amount = this.props.serviceToBuy[0].amount;
            arrayServicesToBuy.push(serviceObj);
        } else {
            let isRepeat = false;
            for (let i = 0; i < this.state.arrayServicesToBuy.length; i++) {
                if (this.state.arrayServicesToBuy[i].code == this.props.serviceToBuy[0].code) {
                    arrayServicesToBuy[i].amountToBuy ++;
                    isRepeat = true;
                }
            }
            if (!isRepeat) {
                let serviceObj = {};
                serviceObj.code = this.props.serviceToBuy[0].code;
                serviceObj.description = this.props.serviceToBuy[0].description;
                serviceObj.price = this.props.serviceToBuy[0].price;
                serviceObj.amountToBuy = 1;
                serviceObj.amount = this.props.serviceToBuy[0].amount;
                arrayServicesToBuy.push(serviceObj);
            }
        }
        this.setState({
            arrayServicesToBuy: arrayServicesToBuy,
            search: '',
        }, () => {
            this.setTotalPrice();
        })
    }
    setTotalPrice = () => {
        let total = 0;
        for (let i = 0; i < this.state.arrayServicesToBuy.length; i++) {
            total = total + (this.state.arrayServicesToBuy[i].price * this.state.arrayServicesToBuy[i].amountToBuy);
        }
        this.setState({
            total: total,
        });
    }
    searchService = () => {
        this.setState({ serviceNotFind: false, })
        if (this.state.search !== '') {
            this.props.onSearchService(this.state.search);
        } else (
            this.setState({ serviceNotFind: true, })
        )
    }
    searchCustomer = (customer) => {
        this.props.onSearchCustomer(customer);
    }
    keyPressed(event) {
        if (event.key === "Enter") {
          this.searchService();
        }
      }
    amountService = (index, value) => {
        let arrayServicesToBuy = this.state.arrayServicesToBuy;
        if (value > 0) {
            arrayServicesToBuy[index].amountToBuy = value;
        } else {
            arrayServicesToBuy[index].amountToBuy = '';
        }
        this.setState({
            arrayServicesToBuy: arrayServicesToBuy
        }, () => {
            this.setTotalPrice();
        });
    }
    deleteService = (index) => {
        let arrayServicesToBuy = this.state.arrayServicesToBuy;
        arrayServicesToBuy.splice(index, 1);
        this.setState({
            arrayServicesToBuy: arrayServicesToBuy,
            descriptionSelected: '',
            codeSelected: '',
            total: 0,
            unitPrice: 0,
        }, () => {
            this.setTotalPrice();
        })
    }
    cleanList = () => {
        this.setState({
            arrayServicesToBuy: [],
            descriptionSelected: '',
            codeSelected: '',
            total: 0,
            unitPrice: 0,
            search: '',
        })
    }
    toggleConfirmPayment = () => {
        this.setState({
            confirmPayment: !this.state.confirmPayment
        })
    }
    confirmPay = () => {
        this.toggleConfirmPayment();
    }
    pay = (data) => {
        this.props.onPay({
            user_uuid: localStorage.getItem('user_uuid'),
            checkedToPay: data.checked,
            rut: data.rutCustomer,
            total: this.state.total,
            arrayServicesToBuy: this.state.arrayServicesToBuy,
        })
    }
    saveClient = (data) => {
        this.props.onSaveClient(data);
    }
    renderSuccessMessage = () => {
        if (this.state.success) {
            return <Alert color="success">
                Venta realizada exitosamente
            </Alert>;
        }
    }
    renderListToBuy = () => {
        let items = [];
        this.state.arrayServicesToBuy.map((element, index) => {
            items.push(<tr>
                <td>{element.code}</td>
                <td>{element.description}</td>
                <td>
                    {/*<i class="fa fa-chevron-up" style={{cursor: 'pointer'}} onClick={() => this.amountService(index, 'sum')}></i>&nbsp;*/}
                    <Input type="number" className="form-control form-control-sm" onChange={(e) => this.amountService(index, e.target.value)}
                        value={element.amountToBuy} placeholder='0'></Input>
                    {/*&nbsp;<i class="fa fa-chevron-down" style={{ cursor: 'pointer' }} onClick={() => this.amountService(index, 'rest')}></i>*/}
                </td>
                <td>{util.formatMoney(element.amountToBuy * element.price)}</td>
                <td>
                    <Button color="danger" className="btn-sm" onClick={() => this.deleteService(index)}><i className="fa fa-close"></i></Button>
                </td>
            </tr>)
        });
        return items;
    }
    render() {
        return (
            <div>
                <Row>
                    <Col md="9">
                        {this.renderSuccessMessage()}
                        <Card>
                            <CardBody>
                                <FormGroup>
                                    <InputGroup className="col-md-6">
                                        <Input type="text" placeholder="Buscar producto" className='form-control form-control-sm'
                                            value={this.state.search} onChange={(e) => this.onChangeValue('search', e.target.value)}
                                            onKeyPress={(e) => this.keyPressed(e)}/>
                                    </InputGroup>
                                    <Col md="6">
                                        {this.state.serviceNotFind ? <span style={{color: 'red'}}>Producto no encontrado</span> : null}
                                    </Col>
                                </FormGroup>
                                <Table responsive size="sm" bordered>
                                    <thead>
                                        <th>Código</th>
                                        <th>Descripción</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th></th>
                                    </thead>
                                    {this.state.arrayServicesToBuy.length > 0 ?
                                        <tbody>
                                            {this.renderListToBuy()}
                                        </tbody>
                                    : <tbody>
                                        <tr>
                                            <td colSpan="5" align="center">Sin registros</td>
                                        </tr>
                                    </tbody>}
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="3">
                        <Row>
                            <Col md="12">
                                <div className='py-2 px-2 mb-2' style={{border: '#000 solid 1px', borderRadius: '5px'}}>
                                    <Row className="mb-3">
                                        <Col>
                                            <h5>Detalle del producto</h5>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col><strong>Descripción</strong></Col>
                                        <Col>{this.state.descriptionSelected}</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col><strong>Código</strong></Col>
                                        <Col>{this.state.codeSelected}</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col><strong>Precio unitario</strong></Col>
                                        <Col>{util.formatMoney(this.state.unitPrice)}</Col>
                                    </Row>
                                </div>
                                <div className="py-3 px-3 mb-2" style={{border: '#000 solid 1px', fontSize: '18px', borderRadius: '5px'}}>
                                    <span>TOTAL</span>
                                    <strong><span className="float-right">{util.formatMoney(this.state.total)}</span></strong>
                                </div>
                                <Button className="btn-block py-3" color="success" onClick={this.confirmPay}> PAGAR </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Button className="btn-block my-3" color="warning" onClick={this.cleanList}> Limpiar </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Modal isOpen={this.state.confirmPayment} toggle={this.toggleConfirmPayment} className={this.props.className}>
                    <ModalBody>
                        <ConfirmPaymentComponent
                            onPay={this.pay}
                            onSaveClient={this.saveClient}
                            onSearchCustomer={this.searchCustomer}
                            customerFinded={this.props.customerFinded}
                            customerCreated={this.props.customerCreated}
                            customer={this.props.customer}
                            customers={this.props.customers}
                            customerError={this.props.customerError}
                            arrayServicesToBuy={this.state.arrayServicesToBuy}
                            total={this.state.total}/>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}