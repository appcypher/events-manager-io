import React from 'react';
import { connect } from 'react-redux';
import DiscoverCenterCard from '../components/DiscoverCenterCard';

class DiscoverCenterCardRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let centers = [...this.props.center.centers];

    // If this component has a `type` prop with `near` value.
    if (this.props.type && this.props.type === 'near') {
      centers = centers.filter(eventCenter => eventCenter.location.trim().toLowerCase() === 'lagos');
    }

    // Count
    let count = -1;

    // Create centerCardElements by mapping details out of centers.
    const centerCardElements = centers.map((center) => {
      // Get details of each center.
      const {
        picture1, name, type, location, description,
      } = center;

      // Increment count.
      count += 1;

      // Return a card.
      return (
        <div onClick={this.props.showViewCenterModal(count)}>
          <DiscoverCenterCard
            imageUrl={picture1}
            name={name}
            type={type}
            location={location}
            description={description}
          />
        </div>
      );
    });

    return (
      <div className="io-center-container">
        <div className="io-cards-container centers">{centerCardElements}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ center }) => ({ center });

export default connect(
  mapStateToProps,
  {},
)(DiscoverCenterCardRow);
