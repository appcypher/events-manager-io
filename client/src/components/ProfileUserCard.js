import React from 'react';
import { connect } from 'react-redux';
import placeholder from '../assets/images/placeholder.jpg';

class ProfileUserCard extends React.Component {
  constructor(props) {
    super(props);

    let imageUrl = this.props.user.user.picture;

    // If image is not provided, use a placeholder image
    if (!imageUrl) {
      imageUrl = placeholder;
    }

    this.state = { ...this.props.user.user, imageUrl };
  }

  render() {
    const {
      imageUrl, tagline, fullname, description,
    } = this.state;

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
          <img alt="profile_img" src={imageUrl} className="io-img" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });


export default connect(
  mapStateToProps,
  {},
)(ProfileUserCard);
