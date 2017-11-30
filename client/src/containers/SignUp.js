import React from 'react';
import HomeNavbar from '../components/HomeNavbar';
import LoginContainer from '../components/LoginContainer';
import SignUpForm from '../components/SignUpForm';

const SignIn = () => (
  <div className="io-stretch-vertical">
    <HomeNavbar />
    <LoginContainer>
      <SignUpForm />
    </LoginContainer>
  </div>
);

export default SignIn;
