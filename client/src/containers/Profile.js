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
    const { events } = this.props;
    return (
      <div>
        <ProfileNavbar />
        <ProfileBody data={events} />
        <Footer />
      </div>
    );
  }
}

export default Profile;
