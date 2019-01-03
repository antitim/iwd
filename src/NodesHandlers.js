import nodeEach from './utils/nodeEach';
import getAttr from './utils/getAttr';

class NodesHandlers {
  constructor () {
    this.nodes = {};
    this.handlers = {};
    this.middleware = [];
  }

  /**
   * Executes a handler named name for all registered 'Node'
   *
   * @param {String} name Name of the handler
   */
  executeHandler = name => {
    const handler = this.handlers[name];
    const nodes = this.nodes[name];

    if (nodes && handler) {
      nodeEach(nodes, node => this.init(node, handler));
    }
  }

  /**
   * Executes the handler for node
   *
   * @param {Element} node Node Element
   * @param {Function} handler Handler
   */
  init = (node, handler) => {
    if (node.classList.contains('js_inited')) return;

    let params = getAttr(node);

    for (let middleware of this.middleware) {
      params = middleware(node, params);
    }

    handler.call(node, params);

    node.classList.add('js_inited');
  }

  addNode = node => {
    // check the availability of the method
    if (!node.getAttribute) return;

    const name = node.getAttribute('data-js');

    if (!name) return;

    node.classList.add('js');

    if (!this.nodes[name]) {
      this.nodes[name] = [];
    }

    this.nodes[name].push(node);

    this.executeHandler(name);
  }

  removedUnusedNode = () => {
    const names = Object.keys(this.nodes);

    for (let i = 0; i < names.length; i++) {
      const name = names[i];

      this.nodes[name] = this.nodes[name].filter(node => node.isConnected);
    }
  }

  addHandler = (name, handler) => {
    this.handlers[name] = handler;
    this.executeHandler(name);
  }

  replaceHandler = (name, handler) => {
    this.handlers[name] = handler;
  }

  removeHandler = name => {
    this.handlers[name] = null;
  }

  removeAllHandlers = () => {
    this.handlers = {};
  }
}

export default NodesHandlers;
