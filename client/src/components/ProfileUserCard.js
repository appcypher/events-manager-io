import React from 'react';

const ProfileUserCard = (props) => {
  const {
    imageurl, tagline, fullname, description,
  } = props;

  return (
    <div className="io-col-center">
      <div className="io-profile-card">
        <div className="io-header">
          <div className="io-name">{fullname} </div>
          <div className="io-spacer" />
          <i className="io-icon fa fa-pencil-square-o" />
        </div>
        <div className="io-short">{tagline}</div>
        <div className="io-long">{description}</div>
        <img alt="profile_img" src={imageurl} className="io-img" />
      </div>
    </div>
  );
};

export default ProfileUserCard;
