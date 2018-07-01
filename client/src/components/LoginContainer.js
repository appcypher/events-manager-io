import React from 'react';
import PropTypes from 'prop-types';

/**
 * Encapsulates the login form
 * @param{Object} props - passed properties
 * @return{React.Component}
 */
const LoginContainer = props => (
  <div className="io-login-container">{props.children}</div>
);


LoginContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default LoginContainer;
