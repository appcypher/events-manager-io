import React from 'react';
import HomeNavbar from '../components/HomeNavbar';
import HomeNavbarLoggedIn from '../components/HomeNavbarLoggedIn';
import LoginContainer from '../components/LoginContainer';
import SignUpForm from '../components/SignUpForm';
import AlertModal from '../components/AlertModal';

class SignUp extends React.Component {
  static renderHomeNavbar() {
    if (
      localStorage.getItem('user.token') !== 'undefined' &&
      localStorage.getItem('user.token') !== ''
    ) {
      return <HomeNavbarLoggedIn />;
    }
    return <HomeNavbar />;
  }

  constructor(props) {
    super(props);
    this.state = {
      alertModalState: { message: '', show: false, type: 'success' },
    };
  }

  componentDidMount() {
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

  render() {
    return (
      <div className="io-stretch-vertical">
        {SignUp.renderHomeNavbar()}
        <LoginContainer>
          <SignUpForm showAlert={this.showAlert} />
        </LoginContainer>
        <AlertModal
          alertModalState={this.state.alertModalState}
          hideAlertModal={this.hideAlertModal}
        />
      </div>
    );
  }
}

export default SignUp;
