import React from 'react';


const DiscoverCenterCardRow = (props) => {
  const { centers } = props;
  const centerCardElements = [];

  centers.forEach((center) => {
    const {
      imageUrl, name, type, location,
    } = center;
    // create centerCard elements and push them into availableCenterCardElements
    centerCardElements.push(<div className="col-6 col-md-4 col-lg-3"><DiscoverCenterCardRow imageUrl={imageUrl} name={name} type={type} location={location} /></div>);
  });

  return (
    <div className="row io-top-row">{centerCardElements}</div>
  );
};

export default DiscoverCenterCardRow;
