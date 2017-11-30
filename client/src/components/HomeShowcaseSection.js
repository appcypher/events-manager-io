import React from 'react';

// Import images
import center1 from '../assets/images/center1.jpg';
import center3 from '../assets/images/center3.jpg';
import center4 from '../assets/images/center4.jpg';

const HomeShowcaseSection = () => (
  <div className="container-fluid">
    <div className="row io-top-row justify-content-center">
      <div className="col-12 col-md-4">
        <div className="io-home-card"><p>Lorem ipsum dolor sit amet</p><img alt="" src={center4} /></div>
      </div>
      <div className="col-12 col-md-4">
        <div className="io-home-card">
          <p>Lorem ipsum dolor sit amet</p><img alt="" src={center1} />
        </div>
      </div>
      <div className="col-12 col-md-4">
        <div className="io-home-card"><p>Lorem ipsum dolor sit amet</p><img alt="" src={center3} /></div>
      </div>
    </div>
  </div>
);

export default HomeShowcaseSection;
