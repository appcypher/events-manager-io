import React from 'react';

class LabelledFab extends React.Component {
  handleKeyDown = () => {}

  render() {
    const {
      showModal, position, label, icon,
    } = this.props;

    // Hide first two fab labels if user not admin.
    const hide = position > 1 && !(localStorage.getItem('user.admin') === 'true') ? 'hide' : '';

    return (
      <div id={`fab-${position}`} className={`io-labelled-fab io-${position} ${hide}`} onClick={showModal}>
        <span>{label}</span>
        <button><i className={`fa fa-${icon}`} /></button>
      </div>
    );
  }
}

export default LabelledFab;
