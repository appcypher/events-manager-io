import React from 'react';
import DiscoverTitleCard from '../components/DiscoverTitleCard';
import DiscoverCenterCardRow from '../components/DiscoverCenterCardRow';

class DiscoverBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="io-body-content">
        <div className="container-fluid">
          <DiscoverTitleCard>Event Centers Near You</DiscoverTitleCard>
          <DiscoverCenterCardRow type="near" showViewCenterModal={this.props.showViewCenterModal} />
          <DiscoverTitleCard>Available Event Centers</DiscoverTitleCard>
          <DiscoverCenterCardRow showViewCenterModal={this.props.showViewCenterModal} />
        </div>
      </div>
    );
  }
}

export default DiscoverBody;
