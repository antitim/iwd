/**
 * IWD. https://github.com/antitim/init-with-dom
 * @version 1.1.0
 * @author Maximilian Timofeev <antitim@yandex.ru>
 */
'use strict';
(function () {
  var camelCase = function (name) {
    return name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
  };

  var getAttr = function (element) {
    var attr = {
      data: {}
    };
    var attributes = element.attributes;

    for (var i = 0; i < attributes.length; ++i) {
      var key = attributes[i].name;
      var value = attributes[i].textContent;

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

  var js = function (target) {
    var elements = target.querySelectorAll ? target.querySelectorAll('[data-js]') : [];

    for (var i = 0; i < elements.length; ++i) {
      var item = elements[i];
      var classes = item.classList;
      classes.add('js');

      if (!classes.contains('js_inited')) {
        var name = item.getAttribute('data-js');

        if (typeof window[name] === 'function') {
          window[name].call(item, getAttr(item));
          classes.add('js_inited');
        }
      }
    };
  };

  var Observer = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

  if (Observer) {
    var observer = new Observer(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === 'childList') {
          js(mutation.target);
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      attributes: true,
      subtree: true
    });
  } else {
    document.addEventListener('DOMSubtreeModified', function (e) {
      js(e.target);
    });
  }

  js(document);
})();
