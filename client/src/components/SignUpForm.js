import React from 'react';
import { Link } from 'react-router-dom';
/**
 * Encapsulates the signup form
 * @param{undefined}
 * @return{React.Component}
 */
const LoginForm = () => (
  <div className="io-login-box">
    <div className="io-title">Sign up for an account</div>
    <div className="io-input io-signup">
      <div className="io-input-group">
        <i className="io-icon fa fa-envelope" />
        <input placeholder="Email" type="email" />
        <i className="io-mark fa fa-check" />
      </div>
      <div className="io-input-group">
        <i className="io-icon fa fa-user" />
        <input placeholder="Username" type="text" />
        <i className="io-mark fa fa-check" />
      </div>
      <div className="io-input-group">
        <i className="io-icon fa fa-id-card" />
        <input placeholder="Full Name" type="text" />
        <i className="io-mark fa fa-check" />
      </div>
      <div className="io-input-group">
        <i className="io-icon fa fa-unlock" />
        <input placeholder="Password" type="password" className="io-password" />
        <i className="io-mark fa fa-check" />
      </div>
      <div className="io-input-group">
        <i className="io-icon fa fa-check-circle" />
        <input placeholder="Confirm Password" type="password" className="io-password" />
        <i className="io-mark fa fa-check" />
      </div>
    </div>
    <div>
      <button id="login-button" className="io-btn io-signup">SIGN UP</button>
      <span className="io-extra">Subscribe for newsletter</span>
    </div>
    <div className="io-extra io-signup">
      <span>Already have an account? </span>
      <Link href to="/signin" className="io-anchor">sign in here </Link>
    </div>
  </div>
);

export default LoginForm;
