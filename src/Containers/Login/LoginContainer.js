import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import history from '../../Services/history';
import AuthActions from '../../Redux/LoginRedux';

class LoginContainer extends Component {
    state = {
        email: '',
        password: '',
    }
    componentDidUpdate = (prevProps) => {
        if (!prevProps.auth.authSuccess && this.props.auth.authSuccess) {
            history.push('/dashboard');
        }
    }
    changeValue = (field, value) => {
        let state = this.state;
        state[field] = value;
        this.setState(state);
    }
    login = () => {
        this.props.actions.auth.login(this.state.email, this.state.password);
    }
    forgotPassword = () => {
        //this.props.actions.auth.forgotPassword(this.state.email);
    }
    renderError = () => {
        if (this.props.auth.error && this.props.auth.error.getFields()) {
            return <p style={{color: 'red'}}>{this.props.auth.error.message}</p>
        }
    }
    render() {
        return (
        <div className="app flex-row align-items-center">
            <Container>
            <Row className="justify-content-center">
                <Col md="8">
                <CardGroup>
                    <Card className="p-4">
                    <CardBody>
                        <Form>
                        <h1>Iniciar sesión</h1>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="icon-user"></i>
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Correo electrónico" onChange={(e) => this.changeValue('email', e.target.value)} />
                        </InputGroup>
                        <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="icon-lock"></i>
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" placeholder="Password" onChange={(e) => this.changeValue('password', e.target.value)} />
                        </InputGroup>
                        {this.renderError()}
                        <Row>
                            <Col xs="6">
                                <Button color="primary" className="px-4" onClick={this.login}>Ingresar</Button>
                            </Col>
                            <Col xs="6" className="text-right">
                                <Button color="link" className="px-0" onClick={this.forgotPassword}>¿Olvidaste la contraseña?</Button>
                            </Col>
                        </Row>
                        </Form>
                    </CardBody>
                    </Card>
                </CardGroup>
                </Col>
            </Row>
            </Container>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    actions: {
        auth: bindActionCreators(AuthActions, dispatch),
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);