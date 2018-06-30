import React from 'react';
import ProfileUserCard from './ProfileUserCard';
import DiscoverTitleCard from '../components/DiscoverTitleCard';
import ProfileEventCards from './ProfileEventCards';

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
          <DiscoverTitleCard>Your Events</DiscoverTitleCard>
          <ProfileEventCards />
        </div>
      </div>
    );
  }
}

export default ProfileBody;
