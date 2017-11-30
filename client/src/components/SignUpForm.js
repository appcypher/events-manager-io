import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UserActions from '../actions/userActions';

@connect(({ user }) => ({ user: user.data }))
class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      email: null,
      fullname: null,
    };
  }

  saveInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submit = () => {
    const {
      username, password, email, fullname,
    } = this.state;

    this.props.dispatch(UserActions.createUser({
      username, password, email, fullname,
    }));
  }

  render() {
    return (
      <div className="io-login-box">
        <div className="io-title">Sign up for an account</div>
        <div className="io-input io-signup">
          <div className="io-input-group">
            <i className="io-icon fa fa-envelope" />
            <input placeholder="Email" type="email" name="email" onChange={this.saveInput} />
            <i className="io-mark fa fa-check" />
          </div>
          <div className="io-input-group">
            <i className="io-icon fa fa-user" />
            <input placeholder="Username" type="text" name="username" onChange={this.saveInput} />
            <i className="io-mark fa fa-check" />
          </div>
          <div className="io-input-group">
            <i className="io-icon fa fa-id-card" />
            <input placeholder="Full Name" type="text" name="fullname" onChange={this.saveInput} />
            <i className="io-mark fa fa-check" />
          </div>
          <div className="io-input-group">
            <i className="io-icon fa fa-unlock" />
            <input placeholder="Password" type="password" className="io-password" name="password" onChange={this.saveInput} />
            <i className="io-mark fa fa-check" />
          </div>
          <div className="io-input-group">
            <i className="io-icon fa fa-check-circle" />
            <input placeholder="Confirm Password" type="password" className="io-password" name="confirmpassword" onChange={this.saveInput} />
            <i className="io-mark fa fa-check" />
          </div>
        </div>
        <div>
          <button id="login-button" className="io-btn io-signup" onClick={this.submit}>SIGN UP</button>
          <span className="io-extra">Subscribe for newsletter</span>
        </div>
        <div className="io-extra io-signup">
          <span>Already have an account? </span>
          <Link href to="/signin" className="io-anchor">sign in here </Link>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
