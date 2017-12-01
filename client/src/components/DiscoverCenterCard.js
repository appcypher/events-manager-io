import React from 'react';

const DiscoverCenterCard = (props) => {
  const {
    imageUrl, name, type, location,
  } = props;

  return (
    <div className="io-center-card">
      <img alt="" src={imageUrl} className="io-img" />
      <div className="io-content">
        <div className="io-title">{name}</div>
        <div className="io-body">{type}</div>
        <p>{location}</p>
      </div>
    </div>
  );
};

export default DiscoverCenterCard;
