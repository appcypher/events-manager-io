import React from 'react';

/**
 * The title bar that shows above events and center cards.
 * @param{Object} props - passed properties
 * @return{React.Component}
 */
const DiscoverTitleCard = props => <div className="io-title-bar">{props.children}</div>;

export default DiscoverTitleCard;
