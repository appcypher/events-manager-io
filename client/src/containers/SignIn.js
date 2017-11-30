import React from 'react';
import HomeNavbar from '../components/HomeNavbar';
import LoginContainer from '../components/LoginContainer';
import LoginForm from '../components/LoginForm';


class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="io-stretch-vertical">
        <HomeNavbar />
        <LoginContainer>
          <LoginForm />
        </LoginContainer>
      </div>
    );
  }
}

export default SignIn;
