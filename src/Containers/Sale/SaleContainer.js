import React, { Component } from 'react';
import {
    Row, Col,
    Card, CardBody,
    Button, FormGroup,
    InputGroup, Input,
    InputGroupAddon,
    Table, Label
} from 'reactstrap';
import util from '../../Util/util';

class SaleContainer extends Component {
    state = {
        quantityProduct: 1,
    }
    amountProduct = (value) => {
        let quantityProduct = this.state.quantityProduct;
        if (value === 'sum') {
            quantityProduct++;
        } else if (value === 'rest') {
            quantityProduct--;
        }
        this.setState({ quantityProduct: quantityProduct });
    }
    render() {
        return (
            <div>
                <Row>
                    <Col md="9">
                        <Card>
                            <CardBody>
                                <FormGroup>
                                    <InputGroup className="col-md-6">
                                        <Input type="text" placeholder="Buscar producto" className='form-control form-control-sm' />
                                        <InputGroupAddon addonType="append">
                                            <Button type="button" className="secondary btn-sm" >
                                                Agregar
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                                <Table responsive>
                                    <thead>
                                        <th>Descripción</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th></th>
                                    </thead>
                                    <tbody>
                                        <td>Coca cola 1L</td>
                                        <td>
                                            <i class="fa fa-chevron-up" style={{cursor: 'pointer'}} onClick={() => this.amountProduct('sum')}></i>&nbsp;
                                            {this.state.quantityProduct}
                                            &nbsp;<i class="fa fa-chevron-down" style={{ cursor: 'pointer' }} onClick={() => this.amountProduct('rest')}></i>
                                        </td>
                                        <td>{util.formatMoney(this.state.quantityProduct * 100)}</td>
                                        <td>
                                            <Button color="danger" className="btn-sm"><i className="fa fa-close"></i></Button>
                                        </td>
                                    </tbody>
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
                                        <Col>Coca cola 1L</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col><strong>Código</strong></Col>
                                        <Col>78099626621</Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col><strong>Precio unitario</strong></Col>
                                        <Col>{util.formatMoney(1250)}</Col>
                                    </Row>
                                </div>
                                <div className="py-3 px-3 mb-2" style={{border: '#000 solid 1px', fontSize: '18px', borderRadius: '5px'}}>
                                    <span>TOTAL</span>
                                    <strong><span className="float-right">{util.formatMoney(12000)}</span></strong>
                                </div>
                                <Button className="btn-block py-3" color="success"> PAGAR </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default SaleContainer;