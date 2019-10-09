import React, { Component } from 'react';
import {
    Row, Col,
    Card, CardBody,
    ButtonGroup, ButtonDropdown,
    DropdownToggle, DropdownMenu,
    DropdownItem
} from 'reactstrap';
import SaleRegistryListComponent from '../../Components/Sale/SaleRegistryListComponent';
import util from '../../Util/util';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SaleActions from '../../Redux/SaleRedux';

class SaleRegistryContainer extends Component {
    state = {
        filters: {},
    }
    componentDidMount = () => {
        this.props.actions.sale.fetchSales();
    }
    nextPage = () => {
        let nextPage = this.props.sale.paginate.current_page + 1;
        let filters = this.state.filters;
        filters.page = nextPage;
        this.props.actions.sale.fetchSales(filters);
    }
    prevPage = () => {
        let prevPage = this.props.sale.paginate.current_page - 1;
        let filters = this.state.filters;
        filters.page = prevPage;
        this.props.actions.sale.fetchSales(filters);
    }
    selectPage = (page) => {
        let filters = this.state.filters;
        filters.page = page;
        this.props.actions.sale.fetchSales(filters);
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
                                        <div className="text-value">{this.props.sale.paginate ? this.props.sale.paginate.total : 0}</div>
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
                        <SaleRegistryListComponent
                            sales={this.props.sale.sales}
                            paginate={this.props.sale.paginate}
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
    sale: state.sale,
});

const mapDispatchToProps = (dispatch) => ({
    actions: {
        sale: bindActionCreators(SaleActions, dispatch),
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SaleRegistryContainer);