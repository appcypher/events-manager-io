import React from 'react';
import DiscoverTitleCard from '../components/DiscoverTitleCard';
import ConnectedDiscoverCenterCardRow from '../components/DiscoverCenterCardRow';

/**
 * Parent element for the content of discover page.
 * @param{Object} props - passed properties
 * @return{React.Component}
 */
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
          <ConnectedDiscoverCenterCardRow type="near" showViewCenterModal={this.props.showViewCenterModal} />
          <DiscoverTitleCard>Available Event Centers</DiscoverTitleCard>
          <ConnectedDiscoverCenterCardRow showViewCenterModal={this.props.showViewCenterModal} />
        </div>
      </div>
    );
  }
}

export default DiscoverBody;
