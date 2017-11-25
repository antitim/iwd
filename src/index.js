import init from './init';
import trigger from './trigger';

const Observer = window.MutationObserver ||
  window.WebKitMutationObserver ||
  window.MozMutationObserver;

if (Observer) {
  var observer = new Observer(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        init(mutation.addedNodes);
      }

      if (mutation.type === 'attributes') {
        trigger(
          mutation.target,
          'iwdUpdate',
          {
            attribute: mutation.attributeName
          }
        );
      }
    });
  });

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
          attribute: e.attrName
        }
      );
    },
    false
  );
}

init(document.querySelectorAll('[data-js]'));
