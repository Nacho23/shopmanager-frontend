import React, { Component } from 'react';
import {
    Card, Table,
    CardBody, Alert,
    Button, Row, Col,
    FormGroup, Label, Input,
    InputGroup, InputGroupAddon,
    Tooltip,
} from 'reactstrap';
import PaginationComponent from '../Common/PaginationComponent';
import util from '../../Util/util';

export default class SaleRegistryListComponent extends Component {
    nextPage = () => {
        this.props.onNextPage();
    }
    prevPage = () => {
        this.props.onPrevPage();
    }
    selectPage = (page) => {
        this.props.onSelectPage(page);
    }
    render() {
        return (
            <Card>
                <CardBody>
                    <h5 className="mb-3">Registro de ventas</h5>
                    <Table responsive>
                        <thead>
                            <th>Fecha venta</th>
                            <th>Monto</th>
                            <th>Relizada por</th>
                        </thead>
                        {this.props.sales ?
                            this.props.sales.length > 0 ?
                            <tbody>
                                {this.props.sales.map((sale, index) => {
                                    return <tr key={sale.id}>
                                    <td>{sale.sale_date}</td>
                                    <td>{sale.total && sale.total !== 0 ? util.formatMoney(parseInt(sale.total)) : null}</td>
                                    <td>{sale.user.first_name || sale.user.last_name ?
                                        sale.user.first_name + ' ' + sale.user.last_name
                                    : sale.user.rut + '-' + sale.user.rut_dv}</td>
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
                    {this.props.paginate
                        ?
                        <PaginationComponent
                            currentPage={this.props.paginate.current_page}
                            pages={this.props.paginate.last_page}
                            hasNextPage={this.props.paginate.next_page_url ? true : false}
                            hasPrevPage={this.props.paginate.prev_page_url ? true : false}
                            onNextPage={this.nextPage}
                            onPrevPage={this.prevPage}
                            onSelectPage={this.selectPage} />
                        :
                        null}
                </CardBody>
            </Card>
        );
    }
}