import React from 'react';

const AlertModal = (props) => {
  const {
    msg, hideAlert,
  } = props;

  return (
    <div id="view-center-modal" className={props.className} >
      <div className="io-modal-body io-error">
        <div className="io-header io-error">ERROR!</div>
        <div className="io-body">
          <div className="io-content io-error">
            <h2>{msg} </h2>
          </div>
        </div>
        <div className="io-footer io-error">
          <button id="view-center-ok" className="io-submit-btn io-sm" onClick={hideAlert}>OK </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
