import React from 'react';
import classNames from 'classnames';

class FabGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hide: true };
  }

  toggleFab() {
    this.setState({ hide: !this.state.hide });
  }

  render() {
    const classes = classNames({ 'io-fab-group': true, hide: this.state.hide });
    return <div id="fab-group" className={classes}>{this.props.children}</div>;
  }
}

export default FabGroup;
