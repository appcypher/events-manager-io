import React from 'react';
import { connect } from 'react-redux';
import DiscoverNavbar from '../components/DiscoverNavbar';
import DiscoverBody from '../components/DiscoverBody';
import Footer from '../components/Footer';
import CenterActions from '../actions/centerActions';

// Argument is a destructured store
@connect(({ nearCenters, otherCenters }) => ({ nearCenters, otherCenters }))
class Home extends React.Component {
  componentWillMount() {
    this.props.dispatch(CenterActions.getAllCenters);
  }

  render() {
    const { nearCenters, otherCenters } = this.props;
    return (
      <div>
        <DiscoverNavbar />
        <DiscoverBody nearCenters={nearCenters} otherCenters={otherCenters} />
        <Footer />
      </div>
    );
  }
}

export default Home;
