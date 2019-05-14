import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import ProviderListComponent from '../../Components/Provider/ProviderListComponent';
import ProviderFormComponent from '../../Components/Provider/ProviderFormComponent';

class ProviderContainer extends Component {
    state = {
        modalCreateProvider: false,
        titleModal: 'Agregar Proveedor',
    }
    toggleConfirm = () => {
        this.setState({ modalCreateProvider: !this.state.modalCreateProvider });
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.state.modalCreateProvider} className={'modal-success'} toggle={this.toggleConfirm}>
                    <ModalHeader toggle={this.toggleConfirm}>{this.state.titleModal}</ModalHeader>
                    <ModalBody>
                        <ProviderFormComponent
                            onAccept={this.createProvider}
                            onCancel={this.toggleConfirm}
                        />
                    </ModalBody>
                </Modal>
                <ProviderListComponent
                    onOpenModal={this.toggleConfirm} />
            </div>
        )
    }
}

export default ProviderContainer;