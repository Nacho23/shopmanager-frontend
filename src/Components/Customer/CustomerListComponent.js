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

export default class CustomerListComponent extends Component {

    render() {
        return (
            <Card>
                <CardBody>
                    <Button color="success" className="btn-sm mr-1 mb-1 float-right" onClick={this.props.onOpenModal}><i className="fa fa-plus-circle"></i> Agregar</Button>
                    <FormGroup>
                        <InputGroup className="col-md-6">
                            <Input type="text" placeholder="Buscar cliente" className='form-control form-control-sm' />
                            <InputGroupAddon addonType="append">
                                <Button type="button" className="secondary btn-sm" >
                                    Buscar
                                    </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                    <Table>
                        <thead>
                            <th>Rut</th>
                            <th>Nombre</th>
                            <th>Correo electrónico</th>
                            <th>Teléfono</th>
                            <th>Dirección</th>
                            <th>Cuenta</th>
                            <th></th>
                            <th></th>
                        </thead>
                        <tbody>
                            <td>18653129-9</td>
                            <td>Juan Hernandez</td>
                            <td>juanh@gmail.com</td>
                            <td>956002323</td>
                            <td>Los volcanes 22</td>
                            <td>{util.formatMoney(10250)}</td>
                            <td style={{paddingRight: '0px'}}>
                                <Button color="warning" className="btn-sm float-right"><i className="fa fa-edit"></i></Button>
                            </td>
                            <td>
                                <Button color="danger" className="btn-sm"><i className="fa fa-close"></i></Button>
                            </td>
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        );
    }
}