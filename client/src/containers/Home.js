import React from 'react';
import HomeNavbar from '../components/HomeNavbar';
import HomeBody from '../components/HomeBody';
import Footer from '../components/Footer';


class Home extends React.Component {
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
        <HomeNavbar />
        <HomeBody />
        <Footer />
      </div>
    );
  }
}

export default Home;
