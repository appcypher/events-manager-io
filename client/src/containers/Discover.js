import React from 'react';
import { connect } from 'react-redux';
import { Notification } from 'react-notification';
import CenterAction from '../actions/centerActions';
import DiscoverNavbar from '../components/DiscoverNavbar';
import ConnectedDiscoverNavbarLoggedIn from '../components/DiscoverNavbarLoggedIn';
import DiscoverBody from '../components/DiscoverBody';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import MainFab from '../components/MainFab';
import LabelledFab from '../components/LabelledFab';
import FabGroup from '../components/FabGroup';
import ConnectedAddCenterModal from '../components/AddCenterModal';
import ConnectedAddEventModal from '../components/AddEventModal';
import ConnectedModifyCenterModal from '../components/ModifyCenterModal';
import ConnectedViewCenterModal from '../components/ViewCenterModal';
import AlertModal from '../components/AlertModal';
import Loader from '../components/Loader';

export class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideFabGroup: true,
      showAddCenterModal: false,
      showViewCenterModal: false,
      showModifyCenterModal: false,
      viewCenterModalState: {},
      showAddEventModal: false,
      modifyCenterModalState: { populate: false },
      showLoader: false,
      showNotification: false,
      notificationState: { message: '', show: false },
      alertModalState: { message: '', show: false, type: 'success' },
      confirmModalState: {
        message: '', show: false, confirmText: '', callback: null,
      },
    };

    // Get token from local storage
    const token = localStorage.getItem('user.token');

    // Get page 1 centers
    this.props.getAllCenters(token, 1);
  }

  componentDidMount = () => {
    // Show current page in document's title.
    document.title = 'Discover • EventsManagerIO';
  }

  getPageCenters = (pageNumber) => {
    // Get page centers
    this.props.getAllCenters(this.props.user.token, pageNumber);
  }

  showAddCenterModal = () => {
    this.setState({
      showAddCenterModal: true,
    });
  }

  hideAddCenterModal = (e) => {
    if (e === undefined || e.target === e.currentTarget) {
      this.setState({
        showAddCenterModal: false,
      });
    }
  }

  showViewCenterModal = listPosition => () => {
    const center = [...this.props.center.centers][listPosition];

    this.setState({
      showViewCenterModal: true,
      viewCenterModalState: center,
    });
  }

  hideViewCenterModal = (e) => {
    if (e === undefined || e.target === e.currentTarget) {
      this.setState({
        showViewCenterModal: false,
      });
    }
  }

  showModifyCenterModal = center => () => {
    this.setState({
      showViewCenterModal: false,
      showModifyCenterModal: true,
      modifyCenterModalState: { ...center, populate: true },
    });
  }

  hideModifyCenterModal = (e) => {
    if (e === undefined || e.target === e.currentTarget) {
      this.setState({
        showModifyCenterModal: false,
      });
    }
  }

  showAddEventModal = () => {
    this.setState({
      showAddEventModal: true,
    });
  }

  hideAddEventModal = (e) => {
    if (e === undefined || e.target === e.currentTarget) {
      this.setState({
        showAddEventModal: false,
      });
    }
  }

  showLoader = () => {
    this.setState({
      showLoader: true,
    });
  }

  hideLoader = () => {
    this.setState({
      showLoader: false,
    });
  }

  showNotification = (message) => {
    this.setState({
      notificationState: { show: true, message },
    });

    setTimeout(() => {
      this.hideNotification();
    }, 2500);
  }

  hideNotification = () => {
    this.setState({
      notificationState: { ...this.state.notificationState, show: false },
    });
  }

  showAlertModal = (message, type) => {
    this.setState({
      alertModalState: { message, type, show: true },
    });
  }

  hideAlertModal = () => {
    this.setState({
      alertModalState: { message: '', type: 'success', show: false },
    });
  }

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
      return <ConnectedDiscoverNavbarLoggedIn history={this.props.history} />;
    }
    return <DiscoverNavbar />;
  }

  render() {
    return (
      <div id="discover-page">
        {this.renderDiscoverNavBar()}
        <DiscoverBody showViewCenterModal={this.showViewCenterModal} />
        <Pagination getPage={this.getPageCenters} />
        <Footer />

        <MainFab toggleFabGroup={this.toggleFabGroup} />
        <FabGroup hideFabGroup={this.state.hideFabGroup} >
          <LabelledFab icon="shield" position="3" label="Make Admin" />
          <LabelledFab icon="map-marker" position="2" label="Add New Center" showAddCenterModal={this.showAddCenterModal} />
          <LabelledFab icon="calendar" position="1" label="Add New Event" showAddEventModal={this.showAddEventModal} />
        </FabGroup>
        <ConnectedAddCenterModal
          showAddCenterModal={this.state.showAddCenterModal}
          hideAddCenterModal={this.hideAddCenterModal}
          showAlertModal={this.showAlertModal}
          showLoader={this.showLoader}
          hideLoader={this.hideLoader}
          showNotification={this.showNotification}
        />
        <ConnectedViewCenterModal
          viewCenterModalState={this.state.viewCenterModalState}
          showViewCenterModal={this.state.showViewCenterModal}
          hideViewCenterModal={this.hideViewCenterModal}
          showModifyCenterModal={this.showModifyCenterModal}
        />
        <ConnectedModifyCenterModal
          modifyCenterModalState={this.state.modifyCenterModalState}
          showModifyCenterModal={this.state.showModifyCenterModal}
          hideModifyCenterModal={this.hideModifyCenterModal}
          showNotification={this.showNotification}
          showAlertModal={this.showAlertModal}
          showLoader={this.showLoader}
          hideLoader={this.hideLoader}
        />
        <Loader
          showLoader={this.state.showLoader}
        />
        <ConnectedAddEventModal
          showAddEventModal={this.state.showAddEventModal}
          hideAddEventModal={this.hideAddEventModal}
          showAlertModal={this.showAlertModal}
          showLoader={this.showLoader}
          hideLoader={this.hideLoader}
          showNotification={this.showNotification}
        />
        <Notification
          isActive={this.state.notificationState.show}
          message={this.state.notificationState.message}
          action=""
          onClick={() => { }}
        />
        <AlertModal
          alertModalState={this.state.alertModalState}
          hideAlertModal={this.hideAlertModal}
        />
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
