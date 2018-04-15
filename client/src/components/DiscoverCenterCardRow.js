import React from 'react';
import { connect } from 'react-redux';
import DiscoverCenterCard from '../components/DiscoverCenterCard';

class DiscoverCenterCardRow extends React.Component {
  constructor(props) {
    super(props);

    let centers = [...this.props.center.centers];
    const centerCardElements = [];

    // If this component has a `type` prop with `near` value.
    if (this.props.type && this.props.type === 'near') {
      centers = centers.filter(eventCenter => eventCenter.location.trim().toLowerCase() === 'lagos');
    }

    centers.forEach((center) => {
      // Get details of each center.
      const {
        imageUrl, name, type, location,
      } = center;

      // Create centerCard elements and push them into centerCardElements
      centerCardElements.push(<div className="col-6 col-md-4 col-lg-3"><DiscoverCenterCard imageUrl={imageUrl} name={name} type={type} location={location} /></div>);
    });

    this.state = { centerCardElements };
  }

  render() {
    return (
      <div className="row io-top-row">{this.state.centerCardElements}</div>
    );
  }
}

const mapStateToProps = ({ center }) => ({ center });


export default connect(
  mapStateToProps,
  {},
)(DiscoverCenterCardRow);
