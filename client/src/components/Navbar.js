import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for ceating navbars
 * @param{undefined}
 * @return{React.Component}
 */
const Navbar = props => (
  <nav className="io-navbar io-fixed-top">{props.children}</nav>
);

Navbar.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Navbar;
