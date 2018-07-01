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
      <div className="io-content">
        <h2>Lorem ipsum dolor sit amet</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nulla aliquet non dolor sit amet tincidunt.
        </p>
      </div>
    </div>
  );
};

export default HomeSlantCard;
