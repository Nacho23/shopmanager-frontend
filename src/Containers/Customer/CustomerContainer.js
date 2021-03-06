import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import history from '../../Services/history';
import AuthActions from '../../Redux/CustomerRedux';
import CustomerListComponent from '../../Components/Customer/CustomerListComponent';
import CustomerFormComponent from '../../Components/Customer/CustomerFormComponent';

class CustomerContainer extends Component {
    state = {
        modalCreateCustomer: false,
        titleModal: 'Agregar cliente',
        customerToEdit: null,
    }
    componentDidMount = () => {
        //console.log('', this.props)
        this.props.actions.customer.fetchCustomers();
    }
    componentDidUpdate = (prevProps) => {
        if (!prevProps.customer.customerCreated && this.props.customer.customerCreated ||
            !prevProps.customer.customerUpdated && this.props.customer.customerUpdated ||
            !prevProps.customer.customerDeleted && this.props.customer.customerDeleted) {
                this.props.actions.customer.fetchCustomers();
                this.setState({
                    modalCreateCustomer: false,
                })
        } else if (!prevProps.customer.customerToEdit && this.props.customer.customerToEdit) {
            this.setState({
                customerToEdit: this.props.customer.customerToEdit,
            }, () => {
                this.toggleConfirm();
            })
        }
    }
    toggleConfirm = () => {
        this.setState({
            modalCreateCustomer: !this.state.modalCreateCustomer,
        });
    }
    getCustomer = (id) => {
        this.props.actions.customer.fetchCustomer(id);
    }
    create = () => {
        this.setState({
            customerToEdit: null,
            modalCreateCustomer: true,
        })
    }
    save = (customer) => {
        this.props.actions.customer.createCustomer(customer);
    }
    update = (customerId, customer) => {
        this.props.actions.customer.updateCustomer(customerId, customer);
    }
    delete = (id) => {
        this.props.actions.customer.deleteCustomer(id);
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.state.modalCreateCustomer} className={'modal-success'} toggle={this.toggleConfirm}>
                    <ModalHeader toggle={this.toggleConfirm}>{this.state.titleModal}</ModalHeader>
                    <ModalBody>
                        <CustomerFormComponent
                            onSave={this.save}
                            onUpdate={this.update}
                            customerToEdit={this.state.customerToEdit}
                        />
                    </ModalBody>
                </Modal>
                <CustomerListComponent
                    onOpenModal={this.create}
                    onDelete={this.delete}
                    customers={this.props.customer.customers}
                    onGetCustomer={this.getCustomer} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    customer: state.customer,
});

const mapDispatchToProps = (dispatch) => ({
    actions: {
        customer: bindActionCreators(AuthActions, dispatch),
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerContainer);