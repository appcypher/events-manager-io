import React from 'react';
import ProfileUserCard from './ProfileUserCard';
import DiscoverTitleCard from '../components/DiscoverTitleCard';
import ProfileEventCards from './ProfileEventCards';
/**
 * Houses contnet of the profile page.
 * @param{undefined}
 * @return{React.Component}
 */
const ProfileBody = props => (
  <div className="io-body-content">
    <div className="container-fluid">
      <ProfileUserCard />
      <DiscoverTitleCard>Your Events</DiscoverTitleCard>
      <ProfileEventCards showModifyEventModal={props.showModifyEventModal} />
    </div>
  </div>
);

export default ProfileBody;
