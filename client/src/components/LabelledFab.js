import React from 'react';

/**
 * The smaller fab that contains an action.
 * @param{undefined}
 * @return{React.Component}
 */
class LabelledFab extends React.Component {
  handleKeyDown = () => {}

  showModal = () => {
    // Calling callbacks depending on which prop is passed to LabelledFab.
    if (this.props.showAddCenterModal) {
      this.props.showAddCenterModal();
    } else if (this.props.showAddEventModal) {
      this.props.showAddEventModal();
    }
  }

  render() {
    const {
      position, label, icon,
    } = this.props;

    // Hide first two fab labels if user not admin.
    const hide = position > 1 && !(localStorage.getItem('user.admin') === 'true') ? 'hide' : '';

    return (
      <div id={`fab-${position}`} className={`io-labelled-fab io-${position} ${hide}`} onClick={this.showModal}>
        <span className="label">{label}</span>
        <button><i className={`fa fa-${icon}`} /></button>
      </div>
    );
  }
}

export default LabelledFab;
