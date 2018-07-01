import React from 'react';
import { connect } from 'react-redux';
import placeholder from '../assets/images/placeholder.jpg';
import UserAction from '../actions/userActions';

/**
 * Shows information of the logged-in user on the profile page.
 */
class ProfileUserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { tagline, description, email } = this.props.user.user;
    let { fullname, picture } = this.props.user.user;

    // If image is not provided, use a placeholder image
    if (!picture) {
      picture = placeholder;
    }

    // If fullname is available, capitalize first character.
    if (fullname) {
      fullname = fullname[0].toUpperCase() + fullname.slice(1);
    }

    return (
      <div className="io-col-center">
        <div className="io-profile-card">
          <div className="io-header">
            <div className="io-name">{fullname} </div>
            <div className="io-spacer" />
            <span><i className="io-icon fa fa-pencil" /></span>
          </div>
          <div className="io-short">{tagline}</div>
          <div className="io-long">{email}</div>
          <div className="io-long">{description}</div>
          <img alt="profile_img" src={picture} className="io-img" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(
  mapStateToProps,
  {
    getUser: UserAction.getUser,
  },
)(ProfileUserCard);
