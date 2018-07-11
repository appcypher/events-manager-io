import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import CenterAction from '../actions/centerActions';

/**
 * Shows information of a selected center.
 */
export class ViewCenterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrls: [],
      name: '',
      type: '',
      price: '',
      location: '',
      available: true,
      events: [],
    };
  }

  adjustPrice = (price) => {
    let str = '';

    if (price) {
      const priceString = (price).toString().split('').reverse().join('');

      for (let i = 0; i < priceString.length; i += 1) {
        str += priceString[i];
        if ((i + 1) % 3 === 0 && i !== priceString.length - 1) {
          str += ',';
        }
      }

      str = str.split('').reverse().join('');
    }

    return str;
  };

  // Modify button shows up only when the user is admin.
  renderModifyButton = () => {
    if (localStorage.getItem('user.admin') === 'true') {
      return <button id="modify-center" className="io-submit-btn io-sm" onClick={this.props.showModifyCenterModal(this.props.viewCenterModalState)}>MODIFY</button>;
    }
    return '';
  }

  render() {
    const classes = classNames({ 'io-modal': true, hide: !this.props.showViewCenterModal });

    const {
      picture1, name, type, location, available, price, events,
    } = this.props.viewCenterModalState;

    const availability = available ? 'CURRENTLY AVAILABLE' : 'NOT AVAILABLE';

    const images = [
      <img src={picture1} alt="" />,
    ];

    const eventViews = [];

    // If events exist on center, then their details are mapped to UI elements.
    if (events) {
      for (let i = 0; i < events.length; i += 1) {
        const { title, date } = events[i];

        // Extracting date and time.
        const year = date.slice(0, 4);
        const month = date.slice(5, 7);
        const day = date.slice(8, 10);
        const hour = date.slice(11, 13);
        const min = date.slice(14, 16);
        const date2 = `${day}/${month}/${year}`;
        const time = `${hour}:${min}`;

        eventViews.push(<div className="io-event"><h5>{title} </h5><p>{date2} </p><p>{time} </p></div>);
      }
    }

    // If there is no event to display, a message is shown.
    if (eventViews.length < 1) {
      eventViews.push(<h5>No available events for this center </h5>);
    }

    return (
      <div id="view-center-modal" className={classes} onClick={this.props.hideViewCenterModal}>
        <div className="io-modal-body">
          <div className="io-header">CENTER DETAILS</div>
          <div className="io-body io-overflow">
            <div className="io-img-hgroup">{images}</div>
            <div className="io-content view">
              <h5 className="available" >{availability}</h5>
              <h2 className="name">{name}</h2>
              <p className="type">{type}</p>
              <p className="location">{location}.</p>
              <p className="price">{`₦${this.adjustPrice(price)} per day`}</p>
              <p className="list-title">Available Facilities</p>
              <div className="list-container">
                <ul className="list">
                  <li>• Chairs</li>
                  <li>• Tables</li>
                  <li>• Parking Lot</li>
                  <li>• Rest Rooms </li>
                </ul>
              </div>
              <div className="io-divider-text"><span className="io-divider" /><span className="io-text">Upcoming Events </span><span className="io-divider" /></div>
              {eventViews}
            </div>
          </div>
          <div className="io-footer">
            {this.renderModifyButton()}
            <button id="view-center-ok" className="io-submit-btn io-sm" onClick={this.props.hideViewCenterModal}>OK </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(
  mapStateToProps,
  {
    getCenter: CenterAction.getCenter,
  },
)(ViewCenterModal);
