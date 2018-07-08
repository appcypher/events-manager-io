import React from 'react';
import ProfileUserCard from './ProfileUserCard';
import DiscoverTitleCard from '../components/DiscoverTitleCard';
import ConnectedProfileEventCards from './ProfileEventCards';
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
      <ConnectedProfileEventCards
        showModifyEventModal={props.showModifyEventModal}
        showAlertModal={props.showAlertModal}
        showLoader={props.showLoader}
        hideLoader={props.hideLoader}
        showNotification={props.showNotification}
        showConfirmModal={props.showConfirmModal}
      />
    </div>
  </div>
);

export default ProfileBody;
