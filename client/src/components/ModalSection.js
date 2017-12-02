import React from 'react';

const ModalSection = (props) => {
  const { title, children } = props;
  let { extra } = props;
  if (!extra) extra = '';

  return (
    <div className={`io-section ${extra}`}>
      <div className="io-text">{title}</div>
      {children}
    </div>
  );
};

export default ModalSection;
