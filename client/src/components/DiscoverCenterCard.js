import React from 'react';
import placeholder from '../assets/images/placeholder.jpg';

const DiscoverCenterCard = (props) => {
  const { name, type, location } = props;
  let { imageUrl } = props;

  // If image is not provided, use a placeholder image
  if (!imageUrl) {
    imageUrl = placeholder;
  }

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
