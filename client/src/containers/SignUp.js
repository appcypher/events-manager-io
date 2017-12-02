import React from 'react';
import HomeNavbar from '../components/HomeNavbar';
import LoginContainer from '../components/LoginContainer';
import SignUpForm from '../components/SignUpForm';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    document.title = 'SignUp • EventsManagerIO';
  }

  render() {
    return (
      <div className="io-stretch-vertical">
        <HomeNavbar />
        <LoginContainer>
          <SignUpForm />
        </LoginContainer>
      </div>
    );
  }
}

export default SignUp;
