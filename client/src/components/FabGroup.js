import React from 'react';
import classNames from 'classnames';

/**
 * Component that houses other smaller Labelled Fabs.
 * @param{Object} props - passed properties
 * @return{React.Component}
 */
const FabGroup = (props) => {
  const classes = classNames({ 'io-fab-group': true, hide: props.hideFabGroup });
  return <div id="fab-group" className={classes}>{props.children}</div>;
};

export default FabGroup;
