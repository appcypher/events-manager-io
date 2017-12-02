import React from 'react';
import { connect } from 'react-redux';
import DiscoverNavbar from '../components/DiscoverNavbar';
import DiscoverBody from '../components/DiscoverBody';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import MainFab from '../components/MainFab';
import LabelledFab from '../components/LabelledFab';
import FabGroup from '../components/FabGroup';
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
        <Pagination />
        <Footer />
        <MainFab />
        <FabGroup>
          <LabelledFab icon="shield" position="3" label="Make Admin" />
          <LabelledFab icon="map-marker" position="2" label="Add New Center" />
          <LabelledFab icon="calendar" position="1" label="Add New Event" />
        </FabGroup>
      </div>
    );
  }
}

export default Home;
