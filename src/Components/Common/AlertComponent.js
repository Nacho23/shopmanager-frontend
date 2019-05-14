import React, { Component } from 'react';
import {
    Container,
    Row, Col,
} from 'reactstrap';

export default class AlertComponent extends Component {
    render() {
        return (
            <Container>
                <Col xs="12">
                    <Row>
                        <Col xs="12">
                            <p>{this.props.message}</p>
                        </Col>
                    </Row>
                </Col>
                <div className="pull-right">
                    {this.props.onCancel ? <button className="btn btn-secondary mx-1" onClick={this.props.onCancel}>Cancelar</button> : null}
                    <button className="btn btn-primary" onClick={this.props.onAccept}>Aceptar</button>
                </div>
            </Container>
        );
    }
}