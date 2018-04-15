import React from 'react';
import ProfileUserCard from './ProfileUserCard';
import ProfileEventCardRow from './ProfileEventCardRow';

class ProfileBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="io-body-content">
        <div className="container-fluid">
          <ProfileUserCard />
          <ProfileEventCardRow />
        </div>
      </div>
    );
  }
}

export default ProfileBody;
