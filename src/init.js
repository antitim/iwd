import getAttr from './getAttr';

export default nodes => {
  for (let i = 0; i < nodes.length; i++) {
    const item = nodes[i];

    if (!item.getAttribute) break;
    const name = item.getAttribute('data-js');

    if (!name) break;
    const classes = item.classList;
    classes.add('js');

    if (!classes.contains('js_inited')) {
      if (typeof window[name] === 'function') {
        window[name].call(item, getAttr(item));
        classes.add('js_inited');
      }
    }
  };
};
