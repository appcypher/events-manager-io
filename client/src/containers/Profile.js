import React from 'react';
import ProfileNavbar from '../components/ProfileNavbar';
import ProfileBody from '../components/ProfileBody';
import Footer from '../components/Footer';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.title = 'Profile • EventsManagerIO';
  }

  render() {
    return (
      <div>
        <ProfileNavbar />
        <ProfileBody />
        <Footer />
      </div>
    );
  }
}

export default Profile;
