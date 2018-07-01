import React from 'react';
import HomeNavbar from '../components/HomeNavbar';
import HomeNavbarLoggedIn from '../components/HomeNavbarLoggedIn';
import LoginContainer from '../components/LoginContainer';
import LoginForm from '../components/LoginForm';
import AlertModal from '../components/AlertModal';


class SignIn extends React.Component {
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
    document.title = 'LogIn • EventsManagerIO';
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
        {SignIn.renderHomeNavbar()}
        <LoginContainer>
          <LoginForm showAlertModal={this.showAlertModal} />
        </LoginContainer>
        <AlertModal
          alertModalState={this.state.alertModalState}
          hideAlertModal={this.hideAlertModal}
        />
      </div>
    );
  }
}

export default SignIn;
