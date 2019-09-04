import camelCase from './camelCase';

export default element => {
  const attr = {
    data: {}
  };

  for (let i = 0; i < element.attributes.length; i++) {
    const value = element.attributes[i].textContent;
    let key = element.attributes[i].name;

    if (key.slice(0, 4) === 'data') {
      key = key.slice(5);
      key = camelCase(key);
      attr.data[key] = value;
    } else {
      key = camelCase(key);
      attr[key] = value;
    }
  }

  return attr;
};
