import React from 'react';
import DiscoverTitleCard from '../components/DiscoverTitleCard';
import DiscoverCenterCardRow from '../components/DiscoverCenterCardRow';

class DiscoverBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { nearCenters, availableCenters } = this.props;
    return (
      <div className="io-body-content">
        <div className="container-fluid">
          <DiscoverTitleCard>Event Centers Near You</DiscoverTitleCard>
          <DiscoverCenterCardRow centers={nearCenters} />
          <DiscoverTitleCard>Available Event Centers</DiscoverTitleCard>
          <DiscoverCenterCardRow centers={availableCenters} />
        </div>
      </div>
    );
  }
}

export default DiscoverBody;
