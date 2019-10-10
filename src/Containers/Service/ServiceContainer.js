import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import history from '../../Services/history';
import ServiceActions from '../../Redux/ServiceRedux';
import ProviderActions from '../../Redux/ProviderRedux';
import ServiceListComponent from '../../Components/Service/ServiceListComponent';
import ServiceFormComponent from '../../Components/Service/ServiceFormComponent';

class ServiceContainer extends Component {
    state = {
        modalCreateService: false,
        titleModal: 'Agregar producto',
        serviceToEdit: null,
    }
    componentDidMount = () => {
        this.props.actions.service.fetchServices();
        this.props.actions.provider.fetchProviders();
    }
    componentDidUpdate = (prevProps) => {
        if (!prevProps.service.serviceCreated && this.props.service.serviceCreated ||
            !prevProps.service.serviceUpdated && this.props.service.serviceUpdated ||
            !prevProps.service.serviceDeleted && this.props.service.serviceDeleted) {
                this.props.actions.service.fetchServicesLow({lowStock: true, list: true})
                this.props.actions.service.fetchServices();
                this.setState({
                    modalCreateService: false,
                })
        } else if (!prevProps.service.serviceToEdit && this.props.service.serviceToEdit) {
            this.setState({
                serviceToEdit: this.props.service.serviceToEdit,
            }, () => {
                this.toggleConfirm();
            })
        }
    }
    toggleConfirm = () => {
        this.setState({
            modalCreateService: !this.state.modalCreateService,
        });
    }
    getService = (id) => {
        this.props.actions.service.fetchService(id);
    }
    create = () => {
        this.setState({
            serviceToEdit: null,
            modalCreateService: true,
        })
    }
    save = (service) => {
        this.props.actions.service.createService(service);
    }
    update = (serviceId, service) => {
        this.props.actions.service.updateService(serviceId, service);
    }
    delete = (id) => {
        this.props.actions.service.deleteService(id);
    }
    search = (search) => {
        this.props.actions.service.fetchServices(search)
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.state.modalCreateService} className={'modal-success'} toggle={this.toggleConfirm}>
                    <ModalHeader toggle={this.toggleConfirm}>{this.state.titleModal}</ModalHeader>
                    <ModalBody>
                        <ServiceFormComponent
                            onSave={this.save}
                            onUpdate={this.update}
                            serviceToEdit={this.state.serviceToEdit}
                            providers={this.props.provider.providers}
                        />
                    </ModalBody>
                </Modal>
                <ServiceListComponent
                    onOpenModal={this.create}
                    onDelete={this.delete}
                    services={this.props.service.services}
                    onGetService={this.getService}
                    onSearch={this.search}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    service: state.service,
    provider: state.provider,
});

const mapDispatchToProps = (dispatch) => ({
    actions: {
        service: bindActionCreators(ServiceActions, dispatch),
        provider: bindActionCreators(ProviderActions, dispatch),
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceContainer);