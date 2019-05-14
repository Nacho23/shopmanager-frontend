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

class SaleRegistryContainer extends Component {
    state = {
        modalCreateSale: false,
        titleModal: 'Agregar Proveedor',
    }
    toggleConfirm = () => {
        this.setState({ modalCreateSale: !this.state.modalCreateSale });
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
                        <SaleRegistryListComponent
                            //pagination={}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default SaleRegistryContainer;