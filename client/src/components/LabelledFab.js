import React from 'react';

class LabelledFab extends React.Component {
  handleKeyDown = () => {}

  render() {
    const {
      showModal, position, label, icon,
    } = this.props;

    return (
      <div id={`fab-${position}`} className={`io-labelled-fab io-${position}`} onClick={showModal}>
        <span>{label}</span>
        <button><i className={`fa fa-${icon}`} /></button>
      </div>
    );
  }
}

export default LabelledFab;
