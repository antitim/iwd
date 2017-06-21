# init-with-dom [![NPM version][npm-image]][npm-url]
## About

This script performs the function with the name specified in the attribute of the dom element in the context of this item.

Supported the start of the function even if the DOM Element has been added after initialization of the script (MutationObserver, DOMNodeInserted).

If the browser does not support MutationObserver or DOMNodeInserted, when you change the DOM tree, you can do trigger the DOMNodeInserted event on the body.

## Usage

```html
<div data-js="time"></div>
<script>
  function time () {
    var self = this; // DOM Element <div data-js="time"></div>
    var seconds;

    setInterval(function () {
      var dt = new Date();

      if (seconds !== dt.getSeconds()) {
        self.innerText = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
      }
      seconds = dt.getSeconds();
    }, 100)
  }
</script>
<script src="../build/initwithdom.min.js"></script>
```
## Demo

[Demo](https://antitim.github.io/init-with-dom/test/)

## License

MIT © [antitim](http://vk.com/antitim)


[npm-image]: https://badge.fury.io/js/init-with-dom.svg
[npm-url]: https://npmjs.org/package/init-with-dom
