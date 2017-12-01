import React from 'react';

const ProfileEventCard = (props) => {
  const {
    imageurl, title, centername, location, date, time,
  } = props;

  return (
    <div className="io-event-card"><img alt="" src={imageurl} />
      <div className="io-content">
        <div className="io-details">
          <div className="io-header">
            <h5>{title}</h5>
            <i className="io-icon fa fa-pencil-square-o" />
            <i className="io-icon fa trash" />
          </div>
          <p>{centername}</p>
          <p className="io-location">{location}</p>
        </div>
        <div className="io-date-time"><span className="io-date">{date}</span><span className="io-time">{time}</span></div>
      </div>
    </div>
  );
};

export default ProfileEventCard;
