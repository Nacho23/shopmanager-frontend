import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import CustomerListComponent from '../../Components/Customer/CustomerListComponent';
import CustomerFormComponent from '../../Components/Customer/CustomerFormComponent';

class CustomerContainer extends Component {
    state = {
        modalCreateCustomer: false,
        titleModal: 'Agregar cliente',
    }
    toggleConfirm = () => {
        this.setState({ modalCreateCustomer: !this.state.modalCreateCustomer });
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.state.modalCreateCustomer} className={'modal-success'} toggle={this.toggleConfirm}>
                    <ModalHeader toggle={this.toggleConfirm}>{this.state.titleModal}</ModalHeader>
                    <ModalBody>
                        <CustomerFormComponent
                            onAccept={this.createCustomer}
                            onCancel={this.toggleConfirm}
                        />
                    </ModalBody>
                </Modal>
                <CustomerListComponent
                    onOpenModal={this.toggleConfirm} />
            </div>
        )
    }
}

export default CustomerContainer;