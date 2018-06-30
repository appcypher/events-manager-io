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
import ViewCenterModal from '../components/ViewCenterModal';
import AlertModal from '../components/AlertModal';
import ModifyCenterModal from '../components/ModifyCenterModal';

class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideFabGroup: true,
      showAddCenterModal: false,
      showViewCenterModal: false,
      showModifyCenterModal: false,
      viewCenterModalState: {},
      modifyCenterModalState: { populate: false },
      alert: { msg: '', hide: true },
    };

    // Get page 1 centers
    this.props.getAllCenters(this.props.user.token, 1);
  }

  componentDidMount = () => {
    document.title = 'Discover • EventsManagerIO';
  }

  getPageCenters = (pageNumber) => {
    // Get page centers
    this.props.getAllCenters(this.props.user.token, pageNumber);
  }

  hideAlert = () => {
    this.setState({
      alert: { hide: true },
    });
  }

  showAlert = (msg) => {
    this.setState({
      alert: { msg, hide: false },
    });
  }

  showAddCenterModal = () => {
    this.setState({
      showAddCenterModal: true,
    });
  }

  hideAddCenterModal = () => {
    this.setState({
      showAddCenterModal: false,
    });
  }

  showViewCenterModal = listPosition => () => {
    const center = [...this.props.center.centers][listPosition];

    this.setState({
      showViewCenterModal: true,
      viewCenterModalState: center,
    });
  }

  hideViewCenterModal = () => {
    this.setState({
      showViewCenterModal: false,
    });
  }

  showModifyCenterModal = center => () => {
    this.setState({
      showViewCenterModal: false,
      showModifyCenterModal: true,
      modifyCenterModalState: { ...center, populate: true },
    });
  }

  hideModifyCenterModal = () => {
    this.setState({
      showModifyCenterModal: false,
    });
  }

  showAddEventModal = () => {}

  toggleFabGroup = () => {
    this.setState({
      hideFabGroup: !this.state.hideFabGroup,
    });
  }

  renderDiscoverNavBar = () => {
    if (
      localStorage.getItem('user.token') !== 'undefined' &&
      localStorage.getItem('user.token') !== ''
    ) {
      return <DiscoverNavbarLoggedIn />;
    }
    return <DiscoverNavbar />;
  }

  render() {
    const { msg, hide } = this.state.alert;
    const alertClasses = classNames({ 'io-modal': true, hide });
    return (
      <div>
        {this.renderDiscoverNavBar()}
        <DiscoverBody showViewCenterModal={this.showViewCenterModal} />
        <Pagination getPageCenters={this.getPageCenters} />
        <Footer />

        <MainFab toggleFabGroup={this.toggleFabGroup} />
        <FabGroup hideFabGroup={this.state.hideFabGroup} >
          <LabelledFab icon="shield" position="3" label="Make Admin" />
          <LabelledFab icon="map-marker" position="2" label="Add New Center" showAddCenterModal={this.showAddCenterModal} />
          <LabelledFab icon="calendar" position="1" label="Add New Event" showAddEventModal={this.showAddEventModal} />
        </FabGroup>
        <AddCenterModal
          showAddCenterModal={this.state.showAddCenterModal}
          hideAddCenterModal={this.hideAddCenterModal}
          showAlert={this.showAlert}
        />
        <ViewCenterModal
          viewCenterModalState={this.state.viewCenterModalState}
          showViewCenterModal={this.state.showViewCenterModal}
          hideViewCenterModal={this.hideViewCenterModal}
          showModifyCenterModal={this.showModifyCenterModal}
          showAlert={this.showAlert}
        />
        <ModifyCenterModal
          modifyCenterModalState={this.state.modifyCenterModalState}
          showModifyCenterModal={this.state.showModifyCenterModal}
          hideModifyCenterModal={this.hideModifyCenterModal}
          showAlert={this.showAlert}
        />
        <AlertModal msg={msg} className={alertClasses} hideAlert={this.hideAlert} />
      </div>
    );
  }
}

const mapStateToProps = ({ user, center }) => ({ user, center });


export default connect(
  mapStateToProps,
  {
    getAllCenters: CenterAction.getAllCenters,
  },
)(Discover);
