import React from 'react';
import classNames from 'classnames';

class FabGroup extends React.Component {
  render() {
    console.log('toggleFabGroup', this.props.hideFabGroup);
    const classes = classNames({ 'io-fab-group': true, hide: this.props.hideFabGroup });
    return <div id="fab-group" className={classes}>{this.props.children}</div>;
  }
}

export default FabGroup;
