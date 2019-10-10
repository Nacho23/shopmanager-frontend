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

export default class ProviderListComponent extends Component {
    delete = (id) => {
        this.props.onDelete(id)
    }
    getProvider = (id) => {
        this.props.onGetProvider(id)
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
                            <Input type="text" placeholder="Buscar proveedor" className='form-control form-control-sm'
                                onChange={(e) => this.onSearchValue(e.target.value)}/>
                        </InputGroup>
                    </FormGroup>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Nombre empresa</th>
                                <th>Representante</th>
                                <th>Correo electrónico</th>
                                <th>Teléfono</th>
                                <th>Dirección</th>
                                <th>Ciudad</th>
                                <th>% ganancia</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        {this.props.providers ?
                             this.props.providers.length > 0 ?
                            <tbody>
                                {this.props.providers.map((provider, index) => {
                                    return <tr key={provider.id}>
                                        <td>{provider.name}</td>
                                        <td>{provider.sales_representative}</td>
                                        <td>{provider.email}</td>
                                        <td>{provider.phone_mobile}</td>
                                        <td>{provider.address_street}</td>
                                        <td>{provider.address_town}</td>
                                        <td>{provider.profit_rate}</td>
                                        <td>
                                            <Button color="warning" className="btn-sm" onClick={() => this.getProvider(provider.id)}><i className="fa fa-edit"></i></Button>
                                        </td>
                                        <td>
                                            <Button color="danger" className="btn-sm" onClick={() => this.delete(provider.id)}><i className="fa fa-close"></i></Button>
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