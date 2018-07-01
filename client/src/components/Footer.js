import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Contains footer information like contacts and links.
 * @param{undefined}
 * @return{React.Component}
 */
const Footer = () => (
  <div id="footer" className="io-footer">
    <div className="container-fluid">
      <div className="row io-top-row justify-content-center">
        <div className="col-6">
          <h3> CONTACT </h3>
          <p>appcypher@outlook.com</p>
          <p>+234 234 567 8901</p>
          <p>+234 099 765 4321</p>
          <p>Lagos, Nigeria.</p>
        </div>
        <div className="col-6">
          <h3> NAVIGATE </h3>
          <Link href to="/signin">Login</Link>
          <Link href to="/signout">Signup</Link>
          <Link href to="/discover">Discover</Link>
          <Link href to="/profile">Profile</Link>
          <Link href to="/home#about">About</Link>
          <Link href to="/home#footer">Contact</Link>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
