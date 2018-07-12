import React from 'react';
import { connect } from 'react-redux';
import DiscoverCenterCard from '../components/DiscoverCenterCard';

/**
 * Component that houses the center cards.
 */
export class DiscoverCenterCardRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const centers = [...this.props.center.centers];

    // Count
    let count = -1;

    // Create centerCardElements by mapping details out of centers.
    let centerCardElements = centers.map((center) => {
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

    // If this component has a `type` prop with `near` filter result by proximity.
    // Using `lagos` as default.
    if (this.props.type && this.props.type === 'near') {
      centerCardElements = centerCardElements.filter((element, index) => centers[index].location.trim().toLowerCase() === 'lagos');
    }

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
