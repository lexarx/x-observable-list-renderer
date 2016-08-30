# Observable list renderer

Observable list renderer is a JavaScript library providing
an efficient way to render DOM nodes for observable list elements.

## Examples

```js
var ObservableList = require('x-observable-list');
var renderList = require('x-observable-list-renderer');

var myList = new ObservableList([1, 2]);
renderList(document.body, myList, function(number) {
	return document.createTextNode(number);
});
myList.add(3);
```

## Installation

```sh
npm install --save x-observable-list-renderer
```