import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import UserAction from '../actions/userActions';
import ProfileNavbar from '../components/ProfileNavbar';
import ProfileBody from '../components/ProfileBody';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import MainFab from '../components/MainFab';
import LabelledFab from '../components/LabelledFab';
import FabGroup from '../components/FabGroup';
import AddCenterModal from '../components/AddCenterModal';
import AlertModal from '../components/AlertModal';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideFabGroup: true,
      showAddCenterModal: false,
      alert: { msg: '', hide: true },
    };

    // Get users details and events
    this.props.getUser(this.props.user.token);
  }

  componentDidMount() {
    document.title = 'Profile • EventsManagerIO';
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

  showAddEventModal = () => {}

  toggleFabGroup = () => {
    this.setState({
      hideFabGroup: !this.state.hideFabGroup,
    });
  }

  render() {
    const { msg, hide } = this.state.alert;
    const alertClasses = classNames({ 'io-modal': true, hide });
    return (
      <div>
        <ProfileNavbar />
        <ProfileBody />
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
        <AlertModal msg={msg} className={alertClasses} hideAlert={this.hideAlert} />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(
  mapStateToProps,
  {
    getUser: UserAction.getUser,
  },
)(Profile);
