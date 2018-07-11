import React from 'react';
import { connect } from 'react-redux';
import { Notification } from 'react-notification';
import UserAction from '../actions/userActions';
import EventAction from '../actions/eventActions';
import ConnectedProfileNavbar from '../components/ProfileNavbar';
import ProfileBody from '../components/ProfileBody';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import MainFab from '../components/MainFab';
import LabelledFab from '../components/LabelledFab';
import FabGroup from '../components/FabGroup';
import ConnectedAddCenterModal from '../components/AddCenterModal';
import ConnectedAddEventModal from '../components/AddEventModal';
import ConnectedModifyEventModal from '../components/ModifyEventModal';
import AlertModal from '../components/AlertModal';
import ConfirmModal from '../components/ConfirmModal';
import Loader from '../components/Loader';

/**
 * Shows information of the profile page.
 */
export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideFabGroup: true,
      showAddCenterModal: false,
      showAddEventModal: false,
      modifyEventModalState: { populate: false },
      showLoader: false,
      notificationState: { message: '', show: false },
      alertModalState: { message: '', show: false, type: 'success' },
      confirmModalState: {
        message: '', show: false, confirmText: '', callback: null,
      },
    };

    // Get token from local storage
    const token = localStorage.getItem('user.token');

    // Get users details and events
    this.props.getUser(token);
    this.props.getAllEvents(token);
  }

  componentDidMount() {
    document.title = 'Profile • EventsManagerIO';
  }

  getPageEvents = (pageNumber) => {
    // Get token from local storage
    const token = localStorage.getItem('user.token');

    // Get page centers
    this.props.getAllEvents(token, pageNumber);
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

  showModifyEventModal = listPosition => () => {
    const event = [...this.props.event.events][listPosition];

    this.setState({
      showModifyEventModal: true,
      modifyEventModalState: { ...event, populate: true },
    });
  }

  hideModifyEventModal = (e) => {
    if (e === undefined || e.target === e.currentTarget) {
      this.setState({
        showModifyEventModal: false,
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

  showConfirmModal = (message, type, confirmText, callback) => () => {
    this.setState({
      confirmModalState: {
        message, type, show: true, confirmText, callback,
      },
    });
  }

  hideConfirmModal = () => {
    this.setState({
      confirmModalState: {
        message: '', type: 'success', show: false, confirmText: '', callback: null,
      },
    });
  }

  toggleFabGroup = () => {
    this.setState({
      hideFabGroup: !this.state.hideFabGroup,
    });
  }

  render() {
    return (
      <div id="profile-page">
        <ConnectedProfileNavbar history={this.props.history} />
        <ProfileBody
          showModifyEventModal={this.showModifyEventModal}
          showAlertModal={this.showAlertModal}
          showLoader={this.showLoader}
          hideLoader={this.hideLoader}
          showNotification={this.showNotification}
          showConfirmModal={this.showConfirmModal}
        />
        <Pagination getPage={this.getPageEvents} />
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
        <ConnectedModifyEventModal
          modifyEventModalState={this.state.modifyEventModalState}
          showModifyEventModal={this.state.showModifyEventModal}
          hideModifyEventModal={this.hideModifyEventModal}
          showNotification={this.showNotification}
          showAlertModal={this.showAlertModal}
          showLoader={this.showLoader}
          hideLoader={this.hideLoader}
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
        <ConfirmModal
          confirmModalState={this.state.confirmModalState}
          hideConfirmModal={this.hideConfirmModal}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ user, event }) => ({ user, event });

export default connect(
  mapStateToProps,
  {
    getUser: UserAction.getUser,
    getAllEvents: EventAction.getAllEvents,
  },
)(Profile);
