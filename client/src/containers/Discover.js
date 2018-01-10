import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import DiscoverNavbar from '../components/DiscoverNavbar';
import DiscoverBody from '../components/DiscoverBody';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import MainFab from '../components/MainFab';
import LabelledFab from '../components/LabelledFab';
import FabGroup from '../components/FabGroup';
import AddCenterModal from '../components/AddCenterModal';
import CenterActions from '../actions/centerActions';
import AlertModal from '../components/AlertModal';

@connect(({ user, center }) => ({ user, center }))
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideAddCenterModal: true,
      alert: {
        msg: '',
        hide: true,
      },
    };
    // Get all centers
    this.props.dispatch(CenterActions.getAllCenters(this.props.user.token));
  }

  componentDidMount() {
    document.title = 'Discover • EventsManagerIO';
  }

  showAlert = (msg) => {
    this.setState({
      alert: { msg, hide: false },
    });
  }

  hideAlert = () => {
    this.setState({
      alert: { hide: true },
    });
  }

  showAddCenterModal = () => {
    this.addCenterModal.showModal();
  }

  toggleFabGroup = () => {
    this.fabGroup.toggleFab();
  }

  showAddEventModal = () => {}

  render() {
    const { centers } = this.props.center;
    const nearCenters = centers.filter(eventCenter => eventCenter.location.trim().toLowerCase() === 'lagos');
    const { msg, hide } = this.state.alert;
    const alertClasses = classNames({ 'io-modal': true, hide });
    return (
      <div>
        <DiscoverNavbar />
        <DiscoverBody nearCenters={nearCenters} availableCenters={centers} />
        <Pagination />
        <Footer />
        <MainFab toggleFab={this.toggleFabGroup} />
        <FabGroup ref={(c) => { this.fabGroup = c; }} >
          <LabelledFab icon="shield" position="3" label="Make Admin" />
          <LabelledFab icon="map-marker" position="2" label="Add New Center" showModal={this.showAddCenterModal} />
          <LabelledFab icon="calendar" position="1" label="Add New Event" showModal={this.showAddEventModal} />
        </FabGroup>
        <AddCenterModal
          ref={(c) => { this.addCenterModal = c; }}
          center={this.props.center}
          user={this.props.user}
          showAlert={this.showAlert}
        />
        <AlertModal msg={msg} className={alertClasses} hideAlert={this.hideAlert} />
      </div>
    );
  }
}

export default Home;
