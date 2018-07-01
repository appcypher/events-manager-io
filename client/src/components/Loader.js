import Spinner from 'react-loader-spinner';
import React from 'react';
import classNames from 'classnames';

/**
 * Component for showing a loading screen
 * @param{Object} props - passed properties
 * @return{ReactElement} - react element
 */
const Loader = (props) => {
  const classes = classNames({ 'io-modal': true, hide: !props.showLoader });

  return (
    <div className={classes}>
      <Spinner
        type="TailSpin"
        color="#424553"
        height="100"
        width="100"
      />
    </div>
  );
};

export default Loader;
