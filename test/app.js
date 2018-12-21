/* global iwd */

// Simple case
iwd.add('signal', function () {
  var self = this;
  self.innerHTML = '✔';
});

// Attribute read
iwd.add('attribute', function (params) {
  var self = this;
  if (
    params.data.key === 'value' &&
    params.data.camelCase === 'hi'
  ) {
    self.innerHTML = '✔';
  }
});

// data-js on body
iwd.add('page', function () {
  var self = this;
  var element = self.querySelector('.js-on-body');
  element.innerHTML = '✔';
});

// Creating with DOM api
iwd.add('creator', function () {
  var self = this;

  var block1 = document.createElement('div');
  block1.setAttribute('data-js', 'signal');

  self.appendChild(block1);
});

// Creating with innerHTML
iwd.add('creatorInnerHtml', function () {
  var self = this;
  self.innerHTML = '<div data-js="signal"></div>';
});

// Creating with innerHTML. Nested
iwd.add('creatorInnerHtmlNested', function  () {
  var self = this;
  self.innerHTML = '<div><div data-js="signal"></div></div>';
});

// Event iwdUpdate
iwd.add('listener', function listener () {
  var self = this;

  self.addEventListener('iwdUpdate', function (e) {
    self.innerHTML = '✔';
  });
});

// Add handler
setTimeout(function () {
  iwd.add('add-handler', function () {
    var self = this;
    self.innerHTML = '✔';
  });
}, 500);

// Replace handler
iwd.add('replace-signal', function () {
  var self = this;
  self.innerHTML = '';
});
iwd.replace('replace-signal', function () {
  var self = this;
  self.innerHTML = '✔';
});
document.querySelector('.replace-handler').innerHTML = '<div data-js="replace-signal">✔</div>';

// Remove handler
setTimeout(function () {
  iwd.add('remove-signal', function () {
    var self = this;
    self.innerHTML = '';
  });
  iwd.remove('remove-signal');
  document.querySelector('.remove-handler').innerHTML = '<div data-js="remove-signal">✔</div>';
}, 1000);

// Remove all handlers
setTimeout(function () {
  iwd.add('remove-all-signal', function () {
    var self = this;
    self.innerHTML = '';
  });
  iwd.removeAll();
  document.querySelector('.remove-all-handlers').innerHTML = '<div data-js="remove-all-signal">✔</div>';
}, 2000);
