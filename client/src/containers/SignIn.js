import React from 'react';
import classNames from 'classnames';
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
      alert: {
        msg: '',
        hide: true,
      },
    };
  }

  componentDidMount() {
    document.title = 'LogIn • EventsManagerIO';
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

  render() {
    const { msg, hide } = this.state.alert;
    const classes = classNames({ 'io-modal': true, hide });
    return (
      <div className="io-stretch-vertical">
        {SignIn.renderHomeNavbar()}
        <LoginContainer>
          <LoginForm showAlert={this.showAlert} />
        </LoginContainer>
        <AlertModal msg={msg} className={classes} hideAlert={this.hideAlert} />
      </div>
    );
  }
}

export default SignIn;
