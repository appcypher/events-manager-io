import React from 'react';
import classNames from 'classnames';

const ConfirmModal = (props) => {
  const {
    message, show, type, confirmText, callback,
  } = props.confirmModalState;

  const classes = classNames({ 'io-modal': true, hide: !show });

  let header;
  if (type === 'error') {
    header = 'ERROR!';
  } else {
    header = 'SUCCESS!';
  }

  return (
    <div className={`${classes} ${type}`} onClick={props.hideConfirmModal}>
      <div className="io-modal-body io-error">
        <div className="io-header io-error">{header}</div>
        <div className="io-body">
          <div className="io-content io-error">
            <h2>{message} </h2>
          </div>
        </div>
        <div className="io-footer io-error">
          <button id="view-center-ok" className="io-submit-btn io-sm" onClick={callback}>{confirmText} </button>
          <button id="view-center-ok" className="io-submit-btn io-sm" onClick={props.hideConfirmModal}>CANCEL </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
