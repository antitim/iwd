# init-with-dom [![NPM version][npm-image]][npm-url]
## About

This script performs the function with the name specified in the attribute of the dom element in the context of this item.

Supported the start of the function even if the DOM Element has been added after initialization of the script (MutationObserver).

## Usage

```html
<div data-js="time" data-name="Hi" id="megaId"></div>
<script>
  function time (params) {
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
  }
</script>
<script src="../build/initwithdom.min.js"></script>
```
## Demo

[Demo](https://antitim.github.io/init-with-dom/test/index.html)

## License

MIT © [antitim](http://vk.com/antitim)


[npm-image]: https://badge.fury.io/js/init-with-dom.svg
[npm-url]: https://npmjs.org/package/init-with-dom
