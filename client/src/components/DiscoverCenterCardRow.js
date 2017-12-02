import React from 'react';
import DiscoverCenterCard from '../components/DiscoverCenterCard';

class DiscoverCenterCardRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { centers } = this.props;
    const centerCardElements = [];

    centers.forEach((center) => {
      const {
        imageUrl, name, type, location,
      } = center;
      // create centerCard elements and push them into centerCardElements
      centerCardElements.push(<div className="col-6 col-md-4 col-lg-3"><DiscoverCenterCard imageUrl={imageUrl} name={name} type={type} location={location} /></div>);
    });

    return (
      <div className="row io-top-row">{centerCardElements}</div>
    );
  }
}

export default DiscoverCenterCardRow;
