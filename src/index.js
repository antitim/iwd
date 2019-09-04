import init from './init';
import trigger from './trigger';

const Observer = window.MutationObserver ||
  window.WebKitMutationObserver ||
  window.MozMutationObserver;

if (Observer) {
  var observer = new Observer(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        const nodes = mutation.addedNodes;
        init(nodes);
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].querySelectorAll) {
            init(nodes[i].querySelectorAll('[data-js]'));
          }
        }
      }

      if (mutation.type === 'attributes') {
        trigger(
          mutation.target,
          'iwdUpdate',
          {
            attribute: mutation.attributeName,
          }
        );
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    attributes: true,
    subtree: true,
  });
} else {
  /**
   * For IE 10
   */
  document.addEventListener(
    'DOMNodeInserted',
    e => {
      if (e.target.constructor !== NodeList) {
        init([e.target]);
      } else {
        init(e.target);
      }
    },
    false
  );

  document.addEventListener(
    'DOMAttrModified',
    e => {
      trigger(
        e.target,
        'iwdUpdate',
        {
          attribute: e.attrName,
        },
      );
    },
    false
  );
}

init(document.querySelectorAll('[data-js]'));
