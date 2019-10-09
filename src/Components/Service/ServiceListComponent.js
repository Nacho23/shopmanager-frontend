import React, { Component } from 'react';
import {
    Card, Table,
    CardBody, Alert,
    Button, Row, Col,
    FormGroup, Label, Input,
    InputGroup, InputGroupAddon,
    Tooltip,
} from 'reactstrap';
import util from '../../Util/util';

export default class ServiceListComponent extends Component {
    state = {
        search: '',
        titleButtonSearch: 'Buscar',
    }
    delete = (id) => {
        this.props.onDelete(id)
    }
    getService = (code) => {
        this.props.onGetService(code)
    }
    onSearchValue = (value) => {
        if (value !== '') {
            this.props.onSearch({search: value});
        } else {
            this.props.onSearch({});
        }
    }
    render() {
        return (
            <Card>
                <CardBody>
                    <Button color="success" className="btn-sm mr-1 mb-1 float-right" onClick={this.props.onOpenModal}><i className="fa fa-plus-circle"></i> Agregar</Button>
                    <FormGroup>
                        <InputGroup className="col-md-6">
                            <Input type="text" placeholder="Buscar servicio" className='form-control form-control-sm'
                                onChange={(e) => this.onSearchValue(e.target.value)}/>
                        </InputGroup>
                    </FormGroup>
                    <Table>
                        <thead>
                            <th>Código</th>
                            <th>Descripción</th>
                            <th>Proveedor</th>
                            <th>Precio unitario</th>
                            <th>Stock</th>
                            <th></th>
                            <th></th>
                        </thead>
                        {this.props.services ?
                            this.props.services.length > 0 ?
                            <tbody>
                                {this.props.services.map((service, index) => {
                                    return <tr key={service.id}>
                                    <td>{service.code}</td>
                                    <td>{service.description}</td>
                                    <td>{service.provider ? service.provider.name : <i>Sin definir</i>}</td>
                                    <td>{util.formatMoney(service.price)}</td>
                                    <td>{service.amount}</td>
                                    <td>
                                        <Button color="warning" className="btn-sm" onClick={() => this.getService(service.code)}><i className="fa fa-edit"></i></Button>
                                    </td>
                                    <td>
                                        <Button color="danger" className="btn-sm" onClick={() => this.delete(service.id)}><i className="fa fa-close"></i></Button>
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