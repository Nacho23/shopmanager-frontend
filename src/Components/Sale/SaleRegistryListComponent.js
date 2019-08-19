import React, { Component } from 'react';
import {
    Card, Table,
    CardBody, Collapse,
    Button, Row, Col,
    FormGroup, Label, Input,
    InputGroup, InputGroupAddon,
    Tooltip,
} from 'reactstrap';
import PaginationComponent from '../Common/PaginationComponent';
import util from '../../Util/util';

export default class SaleRegistryListComponent extends Component {

    render() {
        return (
            <Card>
                <CardBody>
                    <FormGroup>
                        <InputGroup className="col-md-6">
                            <Input type="text" placeholder="Buscar venta" className='form-control form-control-sm' />
                            <InputGroupAddon addonType="append">
                                <Button type="button" className="secondary btn-sm" >
                                    Buscar
                                    </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                    <Table responsive>
                        <thead>
                            <th>ID</th>
                            <th>Fecha venta</th>
                            <th>Monto</th>
                            <th>Relizada por</th>
                        </thead>
                        <tbody>
                            <td>1</td>
                            <td>2019-04-05</td>
                            <td>{util.formatMoney(1250)}</td>
                            <td>Juan Soto</td>
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        );
    }
}