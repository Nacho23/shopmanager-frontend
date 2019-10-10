import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row, Col, Button } from 'reactstrap';
import util from '../../Util/util';

const propTypes = {
  notif: PropTypes.bool,
};
const defaultProps = {
  notif: false,
};

const styles = {
  notification: {
      color: '#000',
      textDecoration: 'none',
      backgroundColor: '#fff'
  }
};

class DefaultHeaderDropdown extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  dropNotif() {
    const itemsCount = this.props.lowServices ? this.props.lowServices.length : 0;
    return (
      <Dropdown nav className="d-md-down-none" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <i className="icon-bell"></i>{this.props.lowServices && this.props.lowServices.length !== 0 ?
            <Badge pill color="danger">{itemsCount}</Badge> : null}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center"><strong>Notificaciones: </strong></DropdownItem>
          {this.props.lowServices && this.props.lowServices.length !== 0 ?
            <DropdownItem toggle={false} style={styles.notification}>
              <div className="text-uppercase mb-1">
                  <small><b>Productos con bajo stock: </b></small>
              </div>
              {this.props.lowServices.map((service, index) => {
                return <ul><li><small className="text-muted">{service.code} - {service.description}</small></li></ul>
              })}
            </DropdownItem>
            :
            <DropdownItem toggle={false} style={styles.notification}>
              <div className="text-uppercase mb-1">
                <small><b>No tiene productos con bajo stock</b></small>
              </div>
            </DropdownItem>}
        </DropdownMenu>
      </Dropdown>
    );
  }
  render() {
    const { notif } = this.props;
    return (
        notif ? this.dropNotif() : null
    );
  }
}

DefaultHeaderDropdown.propTypes = propTypes;
DefaultHeaderDropdown.defaultProps = defaultProps;

export default DefaultHeaderDropdown;