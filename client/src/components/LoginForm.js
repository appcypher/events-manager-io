import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import watch from 'redux-watch';
import UserActions from '../actions/userActions';
import history from '../index';
import store from '../store';

@connect(({ user }) => ({ user }))
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    // Watching for change in user token
    const { user } = this.props;
    const { getState, subscribe } = store;
    const w = watch(getState, user.token);
    subscribe(w((newVal) => {
      if (newVal.user.token !== '') { // if token is not empty BAD LOGIC :/
        history.push('/discover');
      } else {
        this.props.showAlert(newVal.user.message);
      }
    }));
  }

  saveInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submit = () => {
    const { username, password } = this.state;
    this.props.dispatch(UserActions.loginUser({ username, password }));
  }

  render() {
    return (
      <div className="io-login-box">
        <div className="io-title">Log in to your account </div>
        <div className="io-input">
          <div className="io-input-group">
            <i className="io-icon fa fa-user" />
            <input placeholder="Username" type="email" name="username" onChange={this.saveInput} />
            <i className="io-mark fa fa-check" />
          </div>
          <div className="io-input-group">
            <i className="io-icon fa fa-unlock-alt" />
            <input placeholder="Password" type="password" className="io-password" name="password" onChange={this.saveInput} />
            <i className="io-mark fa fa-check" />
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

export default LoginForm;
