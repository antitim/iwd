function signal () {
  var self = this;
  self.innerHTML = '✔';
}

function page () {
  var self = this;
  var element = self.querySelector('.js-on-body');
  element.innerText = '✔';
}

function attribute (params) {
  var self = this;
  if (
    params.data.key === 'value' &&
    params.data.camelCase === 'hi'
  ) {
    self.innerText = '✔';
  }
}

function creator () {
  var self = this;

  var block1 = document.createElement('div');
  block1.setAttribute('data-js', 'signal');

  self.appendChild(block1);
}

function creatorInnerHtml () {
  var self = this;
  self.innerHTML = '<div data-js="signal"></div>';
}

function creatorInnerHtmlNested () {
  var self = this;
  self.innerHTML = '<div><div data-js="signal"></div></div>';
}

function listener () {
  var self = this;

  self.addEventListener('iwdUpdate', function (e) {
    self.innerHTML = '✔';
  });
}
