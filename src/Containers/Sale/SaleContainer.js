import React, { Component } from 'react';
import {
    Row, Col,
    Card, CardBody,
    Button, FormGroup,
    InputGroup, Input,
    InputGroupAddon,
    Table, Label
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ServiceActions from '../../Redux/ServiceRedux';
import CustomerActions from '../../Redux/CustomerRedux';
import SaleActions from '../../Redux/SaleRedux';
import SalesComponent from '../../Components/Sale/SalesComponent';

class SaleContainer extends Component {
    componentDidUpdate = (prevProps) => {
        console.log('props', this.props);
    }
    searchService = (code) => {
        this.props.actions.service.fetchServices({code: code});
    }
    searchCustomer = (customer) => {
        this.props.actions.customer.fetchCustomers({rut: customer});
    }
    saveClient = (data) => {
        this.props.actions.customer.createCustomer(data);
    }
    pay = (data) =>{
        this.props.actions.sale.createSale(data);
    }
    render() {
        return (
            <div>
                <SalesComponent
                    onPay={this.pay}
                    onSaveClient={this.saveClient}
                    onSearchService={this.searchService}
                    onSearchCustomer={this.searchCustomer}
                    serviceFinded={this.props.service.serviceFinded}
                    serviceToBuy={this.props.service.services}
                    customerFinded={this.props.customer.customerFinded}
                    customerCreated={this.props.customer.customerCreated}
                    customer={this.props.customer.customer}
                    customers={this.props.customer.customers}
                    customerError={this.props.customer.error}
                    saleCreated={this.props.sale.saleCreated}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    service: state.service,
    customer: state.customer,
    sale: state.sale,
});

const mapDispatchToProps = (dispatch) => ({
    actions: {
        service: bindActionCreators(ServiceActions, dispatch),
        customer: bindActionCreators(CustomerActions, dispatch),
        sale: bindActionCreators(SaleActions, dispatch),
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SaleContainer);