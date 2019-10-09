import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import history from '../../Services/history';
import ReportActions from '../../Redux/ReportRedux';
import ProviderActions from '../../Redux/ProviderRedux';
import ReportComponent from '../../Components/Report/ReportComponent';

class ReportContainer extends Component {
    state = {
    }
    componentDidMount = () => {
        this.props.actions.provider.fetchProviders();
    }
    componentDidUpdate = (prevProps) => {
        if (!prevProps.report.generated && this.props.report.generated) {
            const accessToken = JSON.parse(localStorage.getItem('access_token'));
            const pathUrl = process.env.REACT_APP_API_URL;
            window.open(pathUrl + 'report/' + this.state.report +
                '?date=' + this.state.date +
                '&provider=' + this.state.provider +
                '&report_format=' + this.state.report_format +
                '&dry_run=' + '0' +
                '&x-access-token=' + accessToken, '_blank');
        }
    }
    generate = (report, data) => {
        this.setState({
            report: report,
            date: data.date,
            provider: data.provider,
            report_format: data.report_format,
        })
        this.props.actions.report.generate(report, data);
    }
    render() {
        return (
            <div>
                <ReportComponent
                    onGenerate={this.generate}
                    providers={this.props.provider.providers}
                    generated={this.props.report.generated}
                    error={this.props.report.error}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    report: state.report,
    provider: state.provider,
});

const mapDispatchToProps = (dispatch) => ({
    actions: {
        report: bindActionCreators(ReportActions, dispatch),
        provider: bindActionCreators(ProviderActions, dispatch),
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);