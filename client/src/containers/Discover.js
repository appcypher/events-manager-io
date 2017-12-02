import React from 'react';
import { connect } from 'react-redux';
import DiscoverNavbar from '../components/DiscoverNavbar';
import DiscoverBody from '../components/DiscoverBody';
import Footer from '../components/Footer';
import CenterActions from '../actions/centerActions';

@connect(({ user, center }) => ({ user, center }))
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(CenterActions.getAllCenters(this.props.user.token));
  }

  componentDidMount() {
    document.title = 'Discover • EventsManagerIO';
  }

  render() {
    const { centers } = this.props.center;
    const nearCenters = centers.filter(eventCenter => eventCenter.location.trim().toLowerCase() === 'lagos');
    return (
      <div>
        <DiscoverNavbar />
        <DiscoverBody nearCenters={nearCenters} availableCenters={centers} />
        <Footer />
      </div>
    );
  }
}

export default Home;
