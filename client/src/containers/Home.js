import React from 'react';
import HomeNavbar from '../components/HomeNavbar';
import HomeNavbarLoggedIn from '../components/HomeNavbarLoggedIn';
import HomeBody from '../components/HomeBody';
import Footer from '../components/Footer';


class Home extends React.Component {
  static renderHomeNavbar() {
    if (
      localStorage.getItem('user.token') !== 'undefined' &&
      localStorage.getItem('user.token') !== ''
    ) {
      return <HomeNavbarLoggedIn />;
    }
    return <HomeNavbar />;
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.title = 'Home • EventsManagerIO';
  }

  render() {
    return (
      <div>
        {Home.renderHomeNavbar()}
        <HomeBody />
        <Footer />
      </div>
    );
  }
}

export default Home;
