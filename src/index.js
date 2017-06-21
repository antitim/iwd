/**
 * init with DOM
 * @version 1.0.0
 * @author Maximilian Timofeev <antitim@yandex.ru>
 */
'use strict';
(function () {
  var js = function (target) {
    var elements = target.querySelectorAll('[data-js]');

    for (var i = 0; i < elements.length; ++i) {
      var item = elements[i];
      var classes = item.classList;
      classes.add('js');

      if (!classes.contains('js_inited')) {
        var name = item.getAttribute('data-js');

        if (typeof window[name] === 'function') {
          window[name].call(item);
          classes.add('js_inited');
        }
      }
    };
  };

  var Observer;

  if (typeof MutationObserver !== 'undefined') {
    Observer = MutationObserver;
  } else if (typeof WebKitMutationObserver !== 'undefined') {
    Observer = WebKitMutationObserver;
  }

  if (Observer) {
    var observer = new Observer(function (mutations) {
      mutations.forEach(function (mutation) {
        js(mutation.target);
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
})();
