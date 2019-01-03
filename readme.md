# IWD (init with DOM) [![NPM version][npm-image]][npm-url]
## About

This library starts the handler when the corresponding element appears in the DOM tree.

You can add a handler first, and then an element in the DOM tree.

You can also add an element first and then a handler.

HTML:

```html
<div data-js="total">
  <div data-js="widget" data-name="World 1"></div>
  <div data-js="widget" data-name="World 2"></div>
  <div data-js="widget" data-name="World 3"></div>
</div>
```

JS:

```js
import iwd from 'init-with-dom';

iwd.add('widget', function (attrs) {
  this.innerText = `Hello ${attrs.data.name}`;

  this.addEventListener('click', () => {}, false);
});

iwd.add('total', function (attrs) {
  const worlds = this.querySelectorAll('[data-js]');

  if (worlds) {
    const el = document.createElement('div');
    el.innerText = `Total: ${worlds.length}`;
    this.append(el);
  }
});

```

Result:
```html
<div data-js="total">
  <div data-js="widget" data-name="World 1">Hello World 1</div>
  <div data-js="widget" data-name="World 2">Hello World 2</div>
  <div data-js="widget" data-name="World 3">Hello World 3</div>
  <div>Total: 3</div>
</div>
```

## API

### iwd.add(name, handler)
Adding handler for Element with `data-js=name`

`name` - name of the element (Value of `data-js` attribute)

`handler` - handler function

### iwd.replace(name, handler)
Replace handler for Element with `data-js=name`

`name` - name of the element (Value of `data-js` attribute)

`handler` - handler function

### iwd.remove(name)
Remove handler for Element with `data-js=name`

`name` - name of the element (Value of `data-js` attribute)

### iwd.removeAll()
Remove all handlers

### iwd.middleware
Array of middlewares

## Middleware
You can use middleware for global adding some props to argument for handler function or doing something with Element.

### Example

Doing something with attrs
```js
iwd.middleware.push(function (node, attrs) {
  const store = {};

  attrs.store = store;
});

iwd.add('some', function (attrs) {
  attrs.store.a = 7;
});

iwd.add('some-2', function (attrs) {
  console.log(attrs.store);
});

```

Doing something with Element

```js

iwd.middleware.push(function (node, attrs) {
  node.addEventListener(...);
});
```

## Browser
- IE 10+
- Edge
- Firefox 14+
- Chrome 18+
- Safari 6+
- Opera 15+
- iOS Safari 6.1+
- Android Browser 4.4 +


## Usage

```html
<div data-js="time" data-name="Hi" id="megaId"></div>
<script src="../dist/iwd.umd.js"></script>
<script>
  iwd.add('time', function (params) {
    var self = this; // DOM Element <div data-js="time"></div>
    var seconds;

    params; // { data: { name: "Hi" }, class: "js", id: "megaId" }

    setInterval(function () {
      var dt = new Date();

      if (seconds !== dt.getSeconds()) {
        self.innerText = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
      }
      seconds = dt.getSeconds();
    }, 100)
  });
</script>
```
## Test
[<img src="https://www.browserstack.com/images/mail/browserstack-logo-footer.png" width="120">](https://www.browserstack.com/)

Thank you to [BrowserStack](https://www.browserstack.com/) for providing the infrastructure that allows to test in real browsers.

[Test](https://antitim.github.io/iwd/test/index.html)

## License

MIT © [antitim](http://vk.com/antitim)


[npm-image]: https://badge.fury.io/js/init-with-dom.svg
[npm-url]: https://npmjs.org/package/init-with-dom
