import React from 'react';

const LabelledFab = (props) => {
  const { position, label, icon } = props;
  return (
    <div id={`fab-${position}`} className={`io-labelled-fab io-${position}`} >
      <span>{label}</span>
      <button><i className={`fa fa-${icon}`} /></button>
    </div>
  );
};

export default LabelledFab;
