import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Discover from './Discover';
import Profile from './Profile';

// Bring in bootstrap
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

// Bring in my custom sass stylesheets
import '../assets/scss/custom.scss';

/**
 * Contains the routes for switching between pages
 * @param{undefined}
 * @return{React.Component}
 */
const App = () => (
  <div className="io-stretch-vertical">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/discover" component={Discover} />
      <Route exact path="/profile" component={Profile} />
    </Switch>
  </div>
);

export default App;
