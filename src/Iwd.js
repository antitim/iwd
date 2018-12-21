import NodesHandlers from './NodesHandlers';
import dispatchEvent from './utils/dispatchEvent';
import nodeEach from './utils/nodeEach';
import getObserver from './utils/getObserver';

class Iwd extends NodesHandlers {
  constructor (args) {
    super(args);

    nodeEach(document.querySelectorAll('[data-js]'), this.addNode);

    this.Observer = getObserver();
    this.attachEvent();
  }

  attachEvent () {
    if (this.Observer) {
      const observer = new this.Observer(this.mutationCallback);
      observer.observe(document.body, {
        childList: true,
        attributes: true,
        subtree: true
      });
    } else {
      /**
       * For IE 10
       */
      document.addEventListener(
        'DOMNodeInserted',
        e => {
          if (e.target.constructor !== NodeList) {
            this.addNode(e.target);
          } else {
            nodeEach(e.target, this.addNode);
          }
        },
        false
      );

      document.addEventListener(
        'DOMAttrModified',
        e => {
          dispatchEvent(
            e.target,
            'iwdUpdate',
            {
              attribute: e.attrName
            }
          );
        },
        false
      );
    }
  }

  mutationCallback = mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        const nodes = mutation.addedNodes;

        nodeEach(nodes, node => {
          this.addNode(node);
  
          if (node.querySelectorAll) {
            nodeEach(
              node.querySelectorAll('[data-js]'),
              this.addNode,
            );
          }
        });
      }
  
      if (mutation.type === 'attributes') {
        dispatchEvent(
          mutation.target,
          'iwdUpdate',
          {
            attribute: mutation.attributeName
          }
        );
      }
    });
  }
}

export default Iwd;
