import React from 'react';

const MainFab = (props) => {
  // Hide fab if user not logged in.
  const hide = localStorage.getItem('user.token') !== 'undefined' && localStorage.getItem('user.token') !== '' ? '' : 'hide';

  return (
    <div id="main-fab" className={`io-fab ${hide}`} onClick={props.toggleFabGroup}><i className="fa fa-plus" /></div>
  );
};

export default MainFab;
