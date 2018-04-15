import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import CenterAction from '../actions/centerActions';
import DiscoverNavbar from '../components/DiscoverNavbar';
import DiscoverNavbarLoggedIn from '../components/DiscoverNavbarLoggedIn';
import DiscoverBody from '../components/DiscoverBody';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import MainFab from '../components/MainFab';
import LabelledFab from '../components/LabelledFab';
import FabGroup from '../components/FabGroup';
import AddCenterModal from '../components/AddCenterModal';
import AlertModal from '../components/AlertModal';

class Discover extends React.Component {
  static renderDiscoverNavBar() {
    if (
      localStorage.getItem('user.token') !== 'undefined' &&
      localStorage.getItem('user.token') !== ''
    ) {
      return <DiscoverNavbarLoggedIn />;
    }
    return <DiscoverNavbar />;
  }

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
    this.props.getAllCenters(this.props.user.token);
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

  showAddEventModal = () => {}

  toggleFabGroup = () => {
    this.fabGroup.toggleFab();
  }

  render() {
    const { msg, hide } = this.state.alert;
    const alertClasses = classNames({ 'io-modal': true, hide });
    return (
      <div>
        {Discover.renderDiscoverNavBar()}
        <DiscoverBody />
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

const mapStateToProps = ({ user, centers }) => ({ user, centers });


export default connect(
  mapStateToProps,
  {
    getAllCenters: CenterAction.getAllCenters,
  },
)(Discover);
