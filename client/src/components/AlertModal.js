import React from 'react';
import classNames from 'classnames';

/**
 * Modal that shows an error to the user.
 * @param{props} - passed properties
 * @return{React.Component}
 */
const AlertModal = (props) => {
  const {
    message, show, type,
  } = props.alertModalState;

  const classes = classNames({ 'io-modal': true, hide: !show });

  let header;
  if (type === 'error') {
    header = 'ERROR!';
  } else {
    header = 'SUCCESS!';
  }

  return (
    <div className={`${classes} ${type} io-error`} onClick={props.hideAlertModal}>
      <div className="io-modal-body io-error">
        <div className="io-header io-error">{header}</div>
        <div className="io-body">
          <div className="io-content io-error">
            <h2>{message} </h2>
          </div>
        </div>
        <div className="io-footer io-error">
          <button id="view-center-ok" className="io-submit-btn io-sm" onClick={props.hideAlertModal}>OK </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
