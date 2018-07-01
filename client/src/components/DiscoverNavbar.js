import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

import brand from '../assets/icons/brand.png';

/**
 * Has the discover navbar styles
 * @param{undefined}
 * @return{React.Component}
 */
const DiscoverNavbar = () => (
  <Navbar classNameName="io-navbar io-fixed-top">
    <Link href to="/" className="io-brand">
      <div className="io-text">EventsManagerIO</div>
      <img alt="" src={brand} className="io-img" />
    </Link>
    <div className="io-middle">
      <input placeholder="Type keyword here" type="text" className="io-search-bar" />
      <i className="io-search-button fa fa-search" />
    </div>
    <div className="io-end">
      <Link href to="/signin" className="io-text">LOGIN</Link>
      <Link href to="/signup" className="io-text">SIGNUP</Link>
    </div>
  </Navbar>
);

export default DiscoverNavbar;
