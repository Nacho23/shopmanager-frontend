import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import ProductListComponent from '../../Components/Product/ProductListComponent';
import ProductFormComponent from '../../Components/Product/ProductFormComponent';

class ProductContainer extends Component {
    state = {
        modalCreateProduct: false,
        titleModal: 'Agregar producto',
    }
    toggleConfirm = () => {
        this.setState({ modalCreateProduct: !this.state.modalCreateProduct });
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.state.modalCreateProduct} className={'modal-success'} toggle={this.toggleConfirm}>
                    <ModalHeader toggle={this.toggleConfirm}>{this.state.titleModal}</ModalHeader>
                    <ModalBody>
                        <ProductFormComponent
                            onAccept={this.createProduct}
                            onCancel={this.toggleConfirm}
                        />
                    </ModalBody>
                </Modal>
                <ProductListComponent
                    onOpenModal={this.toggleConfirm} />
            </div>
        )
    }
}

export default ProductContainer;