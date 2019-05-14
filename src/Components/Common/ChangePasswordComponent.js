import React, { Component } from 'react';
import {
    Container,
    Row, Col,
    Label, Input, FormGroup, Button,
    InputGroup,
} from 'reactstrap';

export default class ChangePasswordComponent extends Component {
    state = {
        old_password: '',
        new_password: '',
        new_password_repeat: '',
        error: null,
        errorPassword: false,
    }
    componentDidUpdate = (prevProps) => {
        if (!prevProps.error && this.props.error) {
            this.setState({
                error: this.props.error,
            })
        }
    }
    getInputValidation = (field) => {
        let props = {};
        if (this.state.error && this.state.error.getFields()[field]) {
            props.invalid = true;
        }
        return props;
    }
    onChangeValue = (field, value) => {
        let state = this.state;
        state[field] = value;
        this.setState(state);
    }
    save = () => {
        this.props.onAccept({
            old_password: this.state.old_password,
            new_password: this.state.new_password,
            new_password_repeat: this.state.new_password_repeat,
        })
    }
    renderError = () => {
        if (this.state.error) {
            return <div className="alert alert-danger fade show" role="alert">
                <div> {this.state.error.message} </div>
            </div>
        }
    }
    render() {
        return (
            <div>
                {this.renderError()}
                <Col xs="12">
                    <Row>
                        <Col>
                            <Label>Contraseña actual</Label>
                            <FormGroup>
                                <InputGroup>
                                    <Input type="password" id="old_password" onChange={(e) => this.onChangeValue('old_password', e.target.value)} required
                                        value={this.state.old_password} className='form-control form-control-sm' {...this.getInputValidation('old_password')}
                                        placeholder={'mínimo 6 caracteres'} />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label>Contraseña nueva</Label>
                            <FormGroup>
                                <InputGroup>
                                    <Input type="password" id="new_password" onChange={(e) => this.onChangeValue('new_password', e.target.value)} required
                                        value={this.state.new_password} className='form-control form-control-sm' {...this.getInputValidation('new_password')}
                                        placeholder={'mínimo 6 caracteres'} />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label>Repetir contraseña</Label>
                            <FormGroup>
                                <InputGroup>
                                    <Input type="password" id="new_password_repeat" onChange={(e) => this.onChangeValue('new_password_repeat', e.target.value)} required
                                        value={this.state.new_password_repeat} className='form-control form-control-sm' {...this.getInputValidation('new_password_repeat')}
                                        placeholder={'mínimo 6 caracteres'} />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
                <div className="pull-right">
                    {this.props.onCancel ? <button className="btn btn-secondary mx-1" onClick={this.props.onCancel}>Cancelar</button> : null}
                    <button className="btn btn-primary" onClick={this.save}>Confirmar</button>
                </div>
            </div>
        );
    }
}