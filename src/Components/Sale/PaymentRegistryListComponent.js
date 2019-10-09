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

export default class PaymentRegistryListComponent extends Component {
    componentDidUpdate = (prevProps) => {
        console.log('PROPS', this.props)
    }
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
                    <h5 className="mb-3">Registro de pagos</h5>
                    <Table responsive>
                        <thead>
                            <th>Fecha pago</th>
                            <th>Monto</th>
                            <th>Cliente</th>
                        </thead>
                        {this.props.payments ?
                            this.props.payments.length > 0 ?
                            <tbody>
                                {this.props.payments.map((payment, index) => {
                                    return <tr key={payment.id}>
                                    <td>{payment.date_payment}</td>
                                    <td>{payment.amount && payment.amount !== 0 ? util.formatMoney(parseInt(payment.amount)) : null}</td>
                                    <td>{payment.customer.first_name || payment.customer.last_name ?
                                        payment.customer.first_name + ' ' + payment.customer.last_name
                                    : payment.customer.rut + '-' + payment.customer.rut_dv}</td>
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