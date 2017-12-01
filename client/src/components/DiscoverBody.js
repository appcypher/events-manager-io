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
      <div>
        <DiscoverTitleCard>Event Centers Near You</DiscoverTitleCard>
        <DiscoverCenterCardRow />
        <DiscoverTitleCard>Available Event Centers</DiscoverTitleCard>
      </div>
    );
  }
}

export default DiscoverBody;
