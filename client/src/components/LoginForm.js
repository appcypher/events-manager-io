import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UserAction from '../actions/userActions';
import history from '../index';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  saveInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submit = () => {
    const { username, password } = this.state;

    const redirectToDiscover = () => {
      // Add token and admin status to localStorage.
      localStorage.setItem('user.token', this.props.user.token);
      localStorage.setItem('user.admin', this.props.user.user.admin);

      // Change page.
      history.push('/discover');
    };
    const showError = () => this.props.showAlert(this.props.user.message);

    this.props.loginUser(
      {
        username, password,
      },
      redirectToDiscover,
      showError,
    );
  }

  render() {
    return (
      <div className="io-login-box">
        <div className="io-title">Log in to your account </div>
        <div className="io-input">
          <div className="io-input-group">
            <i className="io-icon fa fa-user" />
            <input placeholder="Username" type="email" name="username" onChange={this.saveInput} />
            {/* <i className="io-mark fa fa-check" /> */}
          </div>
          <div className="io-input-group">
            <i className="io-icon fa fa-unlock-alt" />
            <input placeholder="Password" type="password" className="io-password" name="password" onChange={this.saveInput} />
            {/* <i className="io-mark fa fa-check" /> */}
          </div>
        </div>
        <div>
          <button id="signup-button" className="io-btn" onClick={this.submit}>LOG IN</button>
          <span className="io-anchor io-forgot">Forgotten password?</span>
        </div>
        <div className="io-extra io-login">
          <span>Don&apos;t have an account? </span>
          <Link href to="/signup" className="io-anchor">register here </Link>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ user }) => ({ user });

export default connect(
  mapStateToProps,
  {
    loginUser: UserAction.loginUser,
    clearUserToken: UserAction.clearUserToken,
  },
)(LoginForm);
