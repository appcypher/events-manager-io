import React from 'react';

/**
 * Shows the checkbox list in the modal.
 * @param{Object} props - passed properties.
 * @return{React.Component}
 */
const ModalList = (props) => {
  const listElements = [];
  let index = 0;

  // Check list is created from props.list.
  props.list.forEach((item) => {
    // Spaces are stripped from the names.
    const name = item.toLowerCase().replace(/\s+/g, '');
    listElements.push(<li key={index += 1}><input className="io-checkbox" type="checkbox" name={name} checked={props.checked} onChange={props.saveInput} /><span className="io-check-text">{item}</span></li>);
  });

  return (
    <ul>{listElements}</ul>
  );
};

export default ModalList;
