import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { connect } from 'react-redux';
import url from '../url';
import EventAction from '../actions/eventActions';
import ModalSection from '../components/ModalSection';

/**
 * This modal allows the user to add new event.
 */
export class AddEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true,
      title: null,
      description: null,
      date: '',
      time: '',
      centerNames: [],
      showDropdown: false,
      centerId: null,
    };
  }

  // Store centerid based on selection from dropdown.
  pickCenter = (id, name, target) => () => {
    this.setState({
      ...this.state,
      centerId: id,
      showDropdown: false,
    });

    // Add selected name in input field.
    const target2 = target;
    target2.value = name;
  }

  // Store details from input fields.
  saveInput = (e) => {
    const { target } = e;

    // Centername input.
    if (target.name === 'centerName') {
      // Reset centerId
      this.setState({
        ...this.state,
        centerId: null,
      });

      // Get token.
      const token = localStorage.getItem('user.token');

      // Set value to meaningless regex value.
      let value = '^$';

      // If value from target is not empty string, set value to it.
      if (target.value.length > 0) {
        ({ value } = target);
      }

      // Make api call to get centers by name.
      axios({
        method: 'GET',
        url: `${url}/api/v1/centers?name=${value}`,
        headers: { token },
      })
        .then((res) => {
          // Get only the center names from response data.
          const centerNames = res.data.centers.map(({ name, id }) => ({ name, id }));

          // Create list elements out of the names.
          this.setState({
            ...this.state,
            centerNames: centerNames.map(({ name, id }) =>
              <li><div onClick={this.pickCenter(id, name, target)}>{name}</div></li>),
          });

          // If the list isn't empty, show dropDown.
          if (centerNames.length > 0) {
            this.setState({
              ...this.state,
              showDropdown: true,
            });
          } else {
            this.setState({
              ...this.state,
              showDropdown: false,
            });
          }
        });

    // Other inputs
    } else {
      this.setState({ [target.name]: target.value });
    }
  }

  submit = () => {
    // Get token.
    const token = localStorage.getItem('user.token');

    // Show loading screen.
    this.props.showLoader();

    // Callback for handling success.
    const reloadPage = () => {
      this.props.hideLoader();
      this.props.hideAddEventModal();

      // Show notification of success.
      this.props.showNotification(this.props.event.message);

      // Relaod page after 2secs.
      setTimeout(
        () => { this.props.getAllEvents(token, 1); },
        2500,
      );
    };

    // Callback for handling error.
    const showError = () => {
      this.props.hideLoader();
      this.props.showAlertModal(this.props.event.message, 'error');
    };

    this.props.createEvent(token, this.state, reloadPage, showError);
  }

  render() {
    const classes = classNames({ 'io-modal': true, hide: !this.props.showAddEventModal });
    return (
      <div id="add-event-modal" className={classes} onClick={this.props.hideAddEventModal}>
        <div className="io-modal-body event">
          <div className="io-header">CREATE NEW EVENT</div>
          <div className="io-body io-overflow">
            <form className="io-content io-start">
              <ModalSection title="Title"><input id="add-event-title" placeholder="Enter name of event here" className="io-input io-input-field" name="title" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Details"><input id="add-event-description" placeholder="Enter description here" className="io-input io-input-field" name="description" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Center">
                <input id="add-event-center" placeholder="Enter center here" className="io-input io-input-field" autoComplete="off" name="centerName" onChange={this.saveInput} />
              </ModalSection>
              <ModalSection title="Date"><input id="add-event-date" type="date" placeholder="Enter date of event here" className="io-input io-input-field" name="date" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Time"><input id="add-event-time" type="time" placeholder="Enter time of event here" className="io-input io-input-field" name="time" onChange={this.saveInput} /></ModalSection>
            </form>
          </div>
          <div className="io-footer">
            <button id="add-event-cancel" className="io-submit-btn io-sm" onClick={this.props.hideAddEventModal}>CANCEL</button>
            <button id="add-event-submit" className="io-submit-btn io-sm" onClick={this.submit}>SUBMIT</button>
          </div>
          <ul className={`io-dropdown ${this.state.showDropdown ? '' : 'hide'}`}>{this.state.centerNames}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ event }) => ({ event });

export default connect(
  mapStateToProps,
  {
    createEvent: EventAction.createEvent,
    getAllEvents: EventAction.getAllEvents,
  },
)(AddEventModal);
