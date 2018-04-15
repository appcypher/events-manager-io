import React from 'react';
import { connect } from 'react-redux';
import ProfileEventCard from '../components/DiscoverCenterCard';

class ProfileEventCardRow extends React.Component {
  constructor(props) {
    super(props);

    const events = [...this.props.user.user.events];
    const eventCardElements = [];

    events.forEach((event) => {
      // Get details of each event.
      const {
        imageUrl, title, centerName, location, date, time,
      } = event;

      // Create eventCard elements and push them into eventCardElements
      eventCardElements.push(<div className="col-12 col-lg-6"><ProfileEventCard imageUrl={imageUrl} title={title} centerName={centerName} location={location} date={date} time={time} /></div>);
    });

    this.state = { eventCardElements };
  }

  render() {
    return (
      <div className="row io-top-row">{this.state.eventCardElements}</div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });


export default connect(
  mapStateToProps,
  {},
)(ProfileEventCardRow);
