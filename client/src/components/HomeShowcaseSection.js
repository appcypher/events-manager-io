import React from 'react';

// Import images
import center1 from '../assets/images/center1.jpg';
import waiter from '../assets/images/waiter.jpg';
import center4 from '../assets/images/center4.jpg';

/**
 * The card that shows more info about the site.
 * @param{props} - passed properties
 * @return{React.Component}
 */
const HomeShowcaseSection = () => (
  <div className="container-fluid">
    <div className="row io-top-row justify-content-center">
      <div className="col-12 col-md-4">
        <div className="io-home-card"><p>Low Prices</p><img alt="" src={center1} /></div>
      </div>
      <div className="col-12 col-md-4">
        <div className="io-home-card">
          <p>Best Facilities</p><img alt="" src={center4} />
        </div>
      </div>
      <div className="col-12 col-md-4">
        <div className="io-home-card"><p>Professional Services</p><img alt="" src={waiter} /></div>
      </div>
    </div>
  </div>
);

export default HomeShowcaseSection;
