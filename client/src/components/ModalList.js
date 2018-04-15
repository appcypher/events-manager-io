import React from 'react';

const ModalList = (props) => {
  const listElements = [];

  let index = 0;

  props.list.forEach((item) => {
    const name = item.toLowerCase().replace(/\s+/g, '');
    listElements.push(<li key={index += 1}><input type="checkbox" name={name} onChange={props.saveInput} /><span className="io-check-text">{item}</span></li>);
  });

  return (
    <ul>{listElements}</ul>
  );
};

export default ModalList;
