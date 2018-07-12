import React from 'react';
import placeholder from '../assets/images/placeholder.jpg';

/**
 * Component in the shape of a card that contains brief details about a center.
 * @param{Object} props - passed properties
 * @return{React.Component}
 */
const DiscoverCenterCard = (props) => {
  const {
    name, type, location, description,
  } = props;
  let { imageUrl } = props;

  // If image is not provided, use a placeholder image
  if (!imageUrl) {
    imageUrl = placeholder;
  }

  return (
    <div className="io-center-card animated zoom-in" >
      <div className="io-img"><img alt="" src={imageUrl} /></div>
      <div className="io-content">
        <div className="io-title">{name}</div>
        <div className="io-body">{type}</div>
        <hr />
        <p className="description">{description}</p>
        <p>{location}</p>
      </div>
    </div>
  );
};

export default DiscoverCenterCard;
