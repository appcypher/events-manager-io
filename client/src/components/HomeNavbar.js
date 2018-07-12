import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

import brand from '../assets/icons/brand.png';

/**
 * Has the home navbar styles and children
 * @param{undefined}
 * @return{React.Component}
 */
const HomeNavbar = () => (
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
      <Link href to="/discover" className="io-text">DISCOVER</Link>
      <Link href to="/signin" className="io-text">LOGIN</Link>
      <Link href to="/signup" className="io-text">SIGNUP</Link>
    </div>
  </Navbar>
);

export default HomeNavbar;
