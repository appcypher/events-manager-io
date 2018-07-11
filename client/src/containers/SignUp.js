import React from 'react';
import HomeNavbar from '../components/HomeNavbar';
import ConnectedHomeNavbarLoggedIn from '../components/HomeNavbarLoggedIn';
import LoginContainer from '../components/LoginContainer';
import ConnectedSignUpForm from '../components/SignUpForm';
import AlertModal from '../components/AlertModal';
import Loader from '../components/Loader';

/**
 * Shows information of the sign-up page.
 */
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertModalState: { message: '', show: false, type: 'success' },
      showLoader: false,
    };
  }

  componentDidMount() {
    // Show current page in document's title.
    document.title = 'SignUp • EventsManagerIO';
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

  renderHomeNavbar = () => {
    if (
      localStorage.getItem('user.token') &&
      localStorage.getItem('user.token') !== 'undefined' &&
      localStorage.getItem('user.token') !== ''
    ) {
      return <ConnectedHomeNavbarLoggedIn />;
    }
    return <HomeNavbar />;
  }

  render() {
    return (
      <div className="io-stretch-vertical">
        {this.renderHomeNavbar()}
        <LoginContainer>
          <ConnectedSignUpForm
            showAlertModal={this.showAlertModal}
            showLoader={this.showLoader}
            hideLoader={this.hideLoader}
            history={this.props.history}
          />
        </LoginContainer>
        <AlertModal
          alertModalState={this.state.alertModalState}
          hideAlertModal={this.hideAlertModal}
        />
        <Loader
          showLoader={this.state.showLoader}
        />
      </div>
    );
  }
}

export default SignUp;
