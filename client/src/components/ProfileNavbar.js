import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import UserAction from '../actions/userActions';

import brand from '../assets/icons/brand.png';

/**
 * Has the profile navbar styles
 */
export class ProfileNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logoutUser = () => {
    // Remove user details in localStorage.
    localStorage.setItem('user.token', 'undefined');
    localStorage.setItem('user.admin', 'undefined');

    // Remove all session data.
    this.props.logoutUser();

    // Change page.
    this.props.history.push('/');
  }

  render() {
    return (
      <Navbar classNameName="io-navbar io-fixed-top">
        <Link href to="/" className="io-brand">
          <div className="io-text">EventsManagerIO</div>
          <img alt="" src={brand} className="io-img" />
        </Link>
        <div className="io-middle">
          <input placeholder="Type keyword here" type="text" className="io-search-bar" />
          <i className="io-search-button fa fa-search" />
        </div>
        <div className="io-end">
          <Link href to="/discover">
            <i className="io-icon fa fa-list" />
            <div className="io-text io-switchable">DISCOVER</div>
          </Link>
          <i className="io-icon fa fa-bell" />
          <div className="io-text io-switchable">MESSAGES</div>
          <i className="io-icon fa fa-sign-out" onClick={this.logoutUser} />
          <div className="io-text io-switchable" onClick={this.logoutUser}>LOGOUT</div>
        </div>
      </Navbar>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(
  mapStateToProps,
  {
    logoutUser: UserAction.logoutUser,
  },
)(ProfileNavbar);
