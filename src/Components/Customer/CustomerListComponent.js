import React, { Component } from 'react';
import {
    Card, Table,
    CardBody,
    Button, Row, Col,
    FormGroup, Label, Input,
    InputGroup, InputGroupAddon,
    Tooltip, Alert,
} from 'reactstrap';
import util from '../../Util/util';

export default class CustomerListComponent extends Component {
    delete = (id) => {
        this.props.onDelete(id)
    }
    getCustomer = (id) => {
        this.props.onGetCustomer(id)
    }
    disabledButton = (customer) => {
        let props = {};
        if (customer.debt === 0) {
            props.disabled = true;
        }
        return props;
    }
    pay = (customer) => {
        this.props.onOpenModalToPay(customer);
    }
    render() {
        return (
            <Card>
                <CardBody>
                    <Button color="success" className="btn-sm mr-1 mb-1 float-right" onClick={this.props.onOpenModal}>
                        <i className="fa fa-plus-circle"></i> Agregar servicio
                    </Button>
                    <Table responsive>
                        <thead>
                            <th>Rut</th>
                            <th>Nombre</th>
                            <th>Correo electrónico</th>
                            <th>Teléfono</th>
                            <th>Deuda</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </thead>
                        {this.props.customers ?
                            this.props.customers.length > 0 ?
                            <tbody>
                                {this.props.customers.map((customer, index) => {
                                    return <tr key={customer.id}>
                                    <td>{customer.rut} - {customer.rut_dv}</td>
                                    <td>{customer.first_name} {customer.last_name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone_mobile}</td>
                                    <td>{customer.debt && customer.debt !== 0 ? util.formatMoney(customer.debt) : null}</td>
                                    <td>
                                        <Button color="warning" className="btn-sm" onClick={() => this.getCustomer(customer.id)}><i className="fa fa-edit"></i></Button>
                                    </td>
                                    <td>
                                        <Button color="danger" className="btn-sm" onClick={() => this.delete(customer.id)}><i className="fa fa-close"></i></Button>
                                    </td>
                                    <td>
                                        <Button color="info" className="btn-sm" onClick={() => this.pay(customer)} {...this.disabledButton(customer)}><i className="fa fa-dollar"></i></Button>
                                    </td>
                                    </tr>
                                })}
                            </tbody>
                        : <td colSpan='9'>
                            <Alert color="info">
                                No existen registros
                            </Alert>
                        </td>
                        : 'Cargando...' }<tbody>
                    </tbody>
                    </Table>
                </CardBody>
            </Card>
        );
    }
}