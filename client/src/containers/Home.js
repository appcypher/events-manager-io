import React from 'react';
import HomeNavbar from '../components/HomeNavbar';
import ConnectedHomeNavbarLoggedIn from '../components/HomeNavbarLoggedIn';
import HomeBody from '../components/HomeBody';
import Footer from '../components/Footer';

/**
 * Shows information of the home page.
 */
class Home extends React.Component {
  static renderHomeNavbar() {
    if (
      localStorage.getItem('user.token') &&
      localStorage.getItem('user.token') !== 'undefined' &&
      localStorage.getItem('user.token') !== ''
    ) {
      return <ConnectedHomeNavbarLoggedIn />;
    }
    return <HomeNavbar />;
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // Show current page in document's title.
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
