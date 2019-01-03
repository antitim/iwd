import Iwd from './Iwd';

const iwd = new Iwd();

export default {
  add: iwd.addHandler,
  replace: iwd.replaceHandler,
  remove: iwd.removeHandler,
  removeAll: iwd.removeAllHandlers,
  middleware: iwd.middleware,
};
