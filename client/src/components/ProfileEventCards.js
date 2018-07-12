import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import placeholder from '../assets/images/placeholder.jpg';
import EventAction from '../actions/eventActions';

/**
 * Contains the event cards that are shown on profile page.
 */
export class ProfileEventCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteEvent = listPosition => () => {
    // Get user token
    const token = localStorage.getItem('user.token');

    // Get the event id.
    const eventId = this.props.event.events[listPosition].id;

    // Show loading screen.
    this.props.showLoader();

    // Callback for handling success.
    const reloadPage = () => {
      this.props.hideLoader();

      // Reload page after 2secs.
      this.props.showNotification(this.props.event.message);

      // Show notification of success.
      setTimeout(
        () => { this.props.getAllEvents(token, 1); },
        2500,
      );
    };

    // Callback for handling error.
    const showError = () => {
      this.props.hideLoader();
      this.props.showAlertModal(this.props.center.message, 'error');
    };

    this.props.deleteEvent(token, eventId, reloadPage, showError);
  }

  confirmDelete = count =>
    this.props.showConfirmModal(
      'Are you sure you want to delete?',
      'confirm',
      'PROCEED',
      this.deleteEvent(count),
    );

  render() {
    let events = [];

    // Populate events with user events if it exists.
    if (this.props.event.events) {
      ({ events } = this.props.event);
    }

    // Count.
    let count = -1;

    // Create eventCardElements by mapping details out of events.
    const eventCardElements = events.map((event) => {
      // Get details of each event.
      const { title, center, date } = event;
      const { name, location } = center;
      let { picture1 } = center;

      // If image is not provided, use a placeholder image
      if (!picture1) {
        picture1 = placeholder;
      }

      // Extracting date and time.
      const year = date.slice(0, 4);
      const month = date.slice(5, 7);
      const day = date.slice(8, 10);
      const hour = date.slice(11, 13);
      const min = date.slice(14, 16);
      const date2 = `${day}/${month}/${year}`;
      const time = `${hour}:${min}`;

      // Check if event is out of date.
      const outOfDate = moment(date).isBefore(moment.now()) ? 'io-done' : '';

      // Increment count.
      count += 1;

      // Return a card.
      return (
        <div>
          <div className={`io-event-card ${outOfDate}`}><img src={picture1} alt="" />
            <div className="io-content">
              <div className="io-details">
                <div className="io-header">
                  <h5>{title}</h5>
                  <span
                    className="io-edit"
                    onClick={outOfDate !== 'io-done' ? this.props.showModifyEventModal(count) : () => {}}
                  >
                    <i className="io-icon fa fa-pencil" />
                  </span>
                  <span
                    className="io-delete"
                    onClick={outOfDate !== 'io-done' ? this.confirmDelete(count) : () => {}}
                  >
                    <i className="io-icon fa fa-trash" />
                  </span>
                </div>
                <p>{name}</p>
                <p className="io-location">{location}</p>
              </div>
              <div className="io-date-time"><span className="io-date">{date2} </span><span className="io-time">{time} </span></div>
            </div>
          </div>,
        </div>
      );
    });

    return (
      <div className="io-center-container">
        <div className="io-cards-container events">{eventCardElements}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, event }) => ({ user, event });

export default connect(
  mapStateToProps,
  {
    deleteEvent: EventAction.deleteEvent,
    getAllEvents: EventAction.getAllEvents,
  },
)(ProfileEventCards);
