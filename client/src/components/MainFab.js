import React from 'react';

/**
 * This is the bigger fab that expands/collapses the smaller fabs.
 * @param{Object} props - passed properties.
 * @return{React.Component}
 */
const MainFab = (props) => {
  // Hide fab if user not logged in.
  const hide = localStorage.getItem('user.token') && localStorage.getItem('user.token') !== 'undefined' && localStorage.getItem('user.token') !== '' ? '' : 'hide';

  return (
    <div id="main-fab" className={`io-fab ${hide}`} onClick={props.toggleFabGroup}><i className="fa fa-plus" /></div>
  );
};

export default MainFab;
