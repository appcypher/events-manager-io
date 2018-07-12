import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

import brand from '../assets/icons/brand.png';

/**
 * Has the home navbar styles and children
 * @param{undefined}
 * @return{React.Component}
 */
export const HomeNavbarLoggedIn = () => (
  <Navbar className="io-navbar io-fixed-top">
    <Link href to="/" className="io-brand">
      <div className="io-text">EventsManagerIO</div>
      <img src={brand} alt="" className="io-img" />
    </Link>
    <div className="io-middle io-start">
      <a href="/#footer">CONTACT</a>
      <a href="/#about">ABOUT</a>
    </div>
    <div className="io-end">
      <Link id="goto-discover" href to="/discover" className="io-text">DISCOVER</Link>
      <Link href to="/profile" className="io-text">PROFILE</Link>
    </div>
  </Navbar>
);

export default HomeNavbarLoggedIn;
