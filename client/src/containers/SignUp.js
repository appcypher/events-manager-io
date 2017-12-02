import React from 'react';
import classNames from 'classnames';
import HomeNavbar from '../components/HomeNavbar';
import LoginContainer from '../components/LoginContainer';
import SignUpForm from '../components/SignUpForm';
import AlertModal from '../components/AlertModal';

class SignUp extends React.Component {
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
    document.title = 'SignUp • EventsManagerIO';
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
        <HomeNavbar />
        <LoginContainer>
          <SignUpForm showAlert={this.showAlert} />
        </LoginContainer>
        <AlertModal msg={msg} className={classes} hideAlert={this.hideAlert} />
      </div>
    );
  }
}

export default SignUp;
