import React from 'react';

/**
 * The slant card that shows more info about the site.
 * @param{props} - passed properties
 * @return{React.Component}
 */
const HomeSlantCard = (props) => {
  const className = props.extraClass ? `io-slant ${props.extraClass}` : 'io-slant';
  return (
    <div className={className}>
      <div className="io-content" />
    </div>
  );
};

export default HomeSlantCard;
