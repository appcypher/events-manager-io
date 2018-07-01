const adjustPrice = (price) => {
  let str = '';

  if (price) {
    const priceString = (price).toString().split('').reverse().join('');

    for (let i = 0; i < priceString.length; i += 1) {
      str += priceString[i];
      if ((i + 1) % 3 === 0 && i !== priceString.length - 1) {
        str += ',';
      }
    }

    str = str.split('').reverse().join('');
  }

  return str;
};

export default adjustPrice;
