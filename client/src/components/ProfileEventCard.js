import React from 'react';
import placeholder from '../assets/images/placeholder.jpg';

const ProfileEventCard = (props) => {
  const {
    title, centerName, location, date, time,
  } = props;

  let { imageUrl } = props;

  // If image is not provided, use a placeholder image
  if (!imageUrl) {
    imageUrl = placeholder;
  }

  return (
    <div className="io-event-card"><img alt="" src={imageUrl} />
      <div className="io-content">
        <div className="io-details">
          <div className="io-header">
            <h5>{title}</h5>
            <i className="io-icon fa fa-pencil-square-o" />
            <i className="io-icon fa trash" />
          </div>
          <p>{centerName}</p>
          <p className="io-location">{location}</p>
        </div>
        <div className="io-date-time"><span className="io-date">{date}</span><span className="io-time">{time}</span></div>
      </div>
    </div>
  );
};

export default ProfileEventCard;
