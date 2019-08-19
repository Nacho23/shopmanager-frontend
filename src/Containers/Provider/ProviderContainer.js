import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import history from '../../Services/history';
import ProviderActions from '../../Redux/ProviderRedux';
import ProviderListComponent from '../../Components/Provider/ProviderListComponent';
import ProviderFormComponent from '../../Components/Provider/ProviderFormComponent';

class ProviderContainer extends Component {
    state = {
        modalCreateProvider: false,
        titleModal: 'Agregar producto',
        providerToEdit: null,
    }
    componentDidMount = () => {
        this.props.actions.provider.fetchProviders();
    }
    componentDidUpdate = (prevProps) => {
        if (!prevProps.provider.providerCreated && this.props.provider.providerCreated ||
            !prevProps.provider.providerUpdated && this.props.provider.providerUpdated ||
            !prevProps.provider.providerDeleted && this.props.provider.providerDeleted) {
                this.props.actions.provider.fetchProviders();
                this.setState({
                    modalCreateProvider: false,
                })
        } else if (!prevProps.provider.providerToEdit && this.props.provider.providerToEdit) {
            this.setState({
                providerToEdit: this.props.provider.providerToEdit,
            }, () => {
                this.toggleConfirm();
            })
        }
    }
    toggleConfirm = () => {
        this.setState({
            modalCreateProvider: !this.state.modalCreateProvider,
        });
    }
    getProvider = (id) => {
        this.props.actions.provider.fetchProvider(id);
    }
    create = () => {
        this.setState({
            providerToEdit: null,
            modalCreateProvider: true,
        })
    }
    save = (provider) => {
        this.props.actions.provider.createProvider(provider);
    }
    update = (providerId, provider) => {
        this.props.actions.provider.updateProvider(providerId, provider);
    }
    delete = (id) => {
        this.props.actions.provider.deleteProvider(id);
    }
    search = (search) => {
        this.props.actions.provider.fetchProviders(search)
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.state.modalCreateProvider} className={'modal-success'} toggle={this.toggleConfirm}>
                    <ModalHeader toggle={this.toggleConfirm}>{this.state.titleModal}</ModalHeader>
                    <ModalBody>
                        <ProviderFormComponent
                            onSave={this.save}
                            onUpdate={this.update}
                            providerToEdit={this.state.providerToEdit}
                        />
                    </ModalBody>
                </Modal>
                <ProviderListComponent
                    onOpenModal={this.create}
                    onDelete={this.delete}
                    providers={this.props.provider.providers}
                    onGetProvider={this.getProvider}
                    onSearch={this.search} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    provider: state.provider,
});

const mapDispatchToProps = (dispatch) => ({
    actions: {
        provider: bindActionCreators(ProviderActions, dispatch),
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProviderContainer);