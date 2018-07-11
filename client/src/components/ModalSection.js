import React from 'react';

/**
 * Represnts a line of input in the modal.
 * @param{Object} props - passed properties
 * @return{React.Component}
 */
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
