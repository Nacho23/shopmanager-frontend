import React, { Component } from 'react';
import {
    Card, Table,
    CardBody, Collapse,
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
                            <th></th>
                            <th></th>
                        </thead>
                        {this.props.customers && this.props.customers.length > 0 ?
                            <tbody>
                                {this.props.customers.map((customer, index) => {
                                    return <tr key={customer.id}>
                                    <td>{customer.rut} - {customer.rut_dv}</td>
                                    <td>{customer.first_name} {customer.last_name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone_mobile}</td>
                                    <td>
                                        <Button color="warning" className="btn-sm" onClick={() => this.getCustomer(customer.id)}><i className="fa fa-edit"></i></Button>
                                    </td>
                                    <td>
                                        <Button color="danger" className="btn-sm" onClick={() => this.delete(customer.id)}><i className="fa fa-close"></i></Button>
                                    </td>
                                    </tr>
                                })}
                            </tbody>
                        :
                        <tbody>
                            <td colSpan='6'>
                                <Alert color="info">
                                    No existen registros
                                </Alert>
                            </td>
                        </tbody>}
                    </Table>
                </CardBody>
            </Card>
        );
    }
}