import React from 'react';
import classNames from 'classnames';

/**
 * Modal that asks for confirmation from the user.
 * @param{props} - passed properties
 * @return{React.Component}
 */
const ConfirmModal = (props) => {
  const {
    message, show, type, confirmText, callback,
  } = props.confirmModalState;

  const classes = classNames({ 'io-modal': true, hide: !show });

  let header;
  if (type === 'error') {
    header = 'ERROR!';
  } else {
    header = 'CONFIRM!';
  }

  return (
    <div id="confirm-modal" className={`${classes} ${type} io-error`} onClick={props.hideConfirmModal}>
      <div className="io-modal-body io-error">
        <div className="io-header io-error">{header}</div>
        <div className="io-body">
          <div className="io-content io-error">
            <h2>{message} </h2>
          </div>
        </div>
        <div className="io-footer io-error">
          <button id="confirm-ok" className="io-submit-btn io-sm" onClick={callback}>{confirmText} </button>
          <button id="confirm-cancel" className="io-submit-btn io-sm" onClick={props.hideConfirmModal}>CANCEL </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
