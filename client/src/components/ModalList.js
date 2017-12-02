import React from 'react';

const ModalList = (props) => {
  const listElements = [];

  props.list.forEach((item) => {
    const name = item.toLowerCase().replace(/\s+/g, '');
    listElements.push(<li><input type="checkbox" name={name} onChange={props.saveInput} /><span className="io-check-text">{item}</span></li>);
  });

  return (
    <ul>{listElements}</ul>
  );
};

export default ModalList;
