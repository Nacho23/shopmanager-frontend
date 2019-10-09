import React, { Component } from 'react';
import {
    Row, Col,
    Card, CardBody,
    ButtonGroup, ButtonDropdown,
    DropdownToggle, DropdownMenu,
    DropdownItem
} from 'reactstrap';
import PaymentRegistryListComponent from '../../Components/Sale/PaymentRegistryListComponent';
import util from '../../Util/util';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PaymentActions from '../../Redux/PaymentRedux';

class PaymentRegistryContainer extends Component {
    state = {
        filters: {},
    }
    componentDidMount = () => {
        this.props.actions.payment.fetchPayments();
    }
    nextPage = () => {
        let nextPage = this.props.payment.paginate.current_page + 1;
        let filters = this.state.filters;
        filters.page = nextPage;
        this.props.actions.payment.fetchPayments(filters);
    }
    prevPage = () => {
        let prevPage = this.props.payment.paginate.current_page - 1;
        let filters = this.state.filters;
        filters.page = prevPage;
        this.props.actions.payment.fetchPayments(filters);
    }
    selectPage = (page) => {
        let filters = this.state.filters;
        filters.page = page;
        this.props.actions.payment.fetchPayments(filters);
    }
    render() {
        return (
            <div>
                <Row>
                    <Col md="3">
                        <Row>
                            <Col md="12">
                                <Card className="text-white bg-info">
                                    <CardBody>
                                        <div>N° Ventas 2019</div>
                                        <div className="text-value">523</div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="12">
                                <Card className="text-white bg-warning">
                                    <CardBody>
                                        <div>Ganancias 2019</div>
                                        <div className="text-value">{util.formatMoney(467990)}</div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="9">
                        <PaymentRegistryListComponent
                            payments={this.props.payment.payments}
                            paginate={this.props.payment.paginate}
                            onNextPage={this.nextPage}
                            onPrevPage={this.prevPage}
                            onSelectPage={this.selectPage}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    payment: state.payment,
});

const mapDispatchToProps = (dispatch) => ({
    actions: {
        payment: bindActionCreators(PaymentActions, dispatch),
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentRegistryContainer);