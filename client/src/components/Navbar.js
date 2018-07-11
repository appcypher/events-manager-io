import React from 'react';

/**
 * Component for ceating navbars
 * @param{props} - passed properties
 * @return{React.Component}
 */
const Navbar = props => (
  <nav className="io-navbar io-fixed-top">{props.children}</nav>
);

export default Navbar;
