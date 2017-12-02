import React from 'react';
import { connect } from 'react-redux';
import DiscoverNavbar from '../components/DiscoverNavbar';
import DiscoverBody from '../components/DiscoverBody';
import Footer from '../components/Footer';

@connect(({ centers }) => ({ centers: centers.data }))
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nearCenters: null,
      availableCenters: null,
    };
  }

  componentDidMount() {
    document.title = 'Discover • EventsManagerIO';
  }

  filterLocation() {
    this.setState({ nearCenters: this.props.centers.filter(center => center.location === 'Lagos') });
  }

  render() {
    const { nearCenters } = this.state;
    const { centers } = this.props;
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
