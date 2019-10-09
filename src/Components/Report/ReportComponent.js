import React, { Component } from 'react';
import {
    Card, CardHeader,
    CardBody, Alert,
    Button, Row, Col,
    FormGroup, Label, Input,
    InputGroup, InputGroupAddon,
    Tooltip,
} from 'reactstrap';
import util from '../../Util/util';

export default class ReportComponent extends Component {
    state = {
        titleButton: 'Generar informe',
        report: "DiaryReport",
        date: '',
    }
    componentWillMount = () => {
        let date = new Date();
        this.setState({
            date: date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).toString().substr(-2) + '-' + ('0' + date.getDate()).toString().substr(-2)
        });
    }
    componentDidUpdate = (prevProps) => {
        if (!prevProps.generated && this.props.generated ||
            !prevProps.error && this.props.error) {
                this.setState({
                    titleButton: 'Generar informe',
                })
            }
    }
    onChangeValue = (field, value) => {
        let state = this.state;
        state[field] = value;
        this.setState(state);
    }
    getInputValidation = (field) => {
        let props = {};
        if (this.props.error && this.props.error.getFields()[field]) {
            props.invalid = true;
        }
        return props;
    }
    generate = () => {
        this.setState({ titleButton: 'Generando...', });
        this.props.onGenerate(this.state.report, {
            dry_run: 1,
            date: this.state.date,
            provider: this.state.provider,
            report_format: 'pdf',
        })
    }
    renderProvider = () => {
        if (this.state.report == 'DiaryReportProvider') {
            return <Col>
                <Input type="select" className="form-control form-control-sm" onChange={(e) => this.onChangeValue('provider', e.target.value)}
                    value={this.state.provider} {...this.getInputValidation('provider')}>
                        <option value="">Seleccione proveedor</option>
                        {this.props.providers ? this.props.providers.map((provider, index) => {
                            return <option key={provider.id} value={provider.id}>{provider.name}</option>
                        }): null}
                </Input>
            </Col>
        }
    }
    render() {
        return (
            <Card>
                <CardHeader>
                    Informes
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <Input type="select" className="form-control form-control-sm" onChange={(e) => this.onChangeValue('report', e.target.value)}>
                                <option value="DiaryReport">Ventas diarias</option>
                                <option value="DiaryReportProvider">Ventas diarias por proveedor</option>
                            </Input>
                        </Col>
                        {this.renderProvider()}
                        <Col>
                            <Input type="date" className="form-control form-control-sm" onChange={(e) => this.onChangeValue('date', e.target.value)}
                                value={this.state.date} {...this.getInputValidation('date')}></Input>
                        </Col>
                        <Col className="text-right">
                            <Button color="success" size="sm" onClick={this.generate}>{this.state.titleButton}</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        );
    }
}