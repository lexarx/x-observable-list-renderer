/**
 * Renders list elements into the provided node and
 * keeps the rendering in sync when the list is changed.
 * @param {Node} node
 * @param {ObservableList} list
 * @param {Function} renderElement
 * @param {Function} [disposeNode]
 * @returns {ObservableListRenderer}
 */
function renderObservableList(node, list, renderElement, disposeNode) {
	var renderer = new ObservableListRenderer(node, list, renderElement, disposeNode);
	renderer.start();
	return renderer;
}

/**
 * @class ObservableListRenderer
 * @param {Node} node
 * @param {ObservableList} list
 * @param {Function} renderElement
 * @param {Function} disposeNode
 */
function ObservableListRenderer(node, list, renderElement, disposeNode) {
	this.node = node;
	this.list = list;
	this.renderElement = renderElement;
	this.disposeNode = disposeNode;
}

ObservableListRenderer.prototype = {
	start: function() {
		this.list.forEach(function(element) {
			var elementNode = this.renderElement(element);
			this.node.appendChild(elementNode);
		}, this);
		this.list.changed.addListener(this.onListChanged, this);
	},

	stop: function() {
		this.list.changed.removeListener(this.onListChanged, this);
	},

	onListChanged: function(index, removedElements, addedElements) {
		for (var i = 0; i < removedElements.length; i++) {
			var elementNode = this.node.childNodes[index];
			this.node.removeChild(elementNode);
			if (this.disposeNode !== undefined) {
				this.disposeNode(elementNode, removedElements[i]);
			}
		}
		var nextNode = index < this.node.childNodes.length ? this.node.childNodes[index] : null;
		for (var i = 0; i < addedElements.length; i++) {
			var elementNode = this.renderElement(addedElements[i]);
			this.node.insertBefore(elementNode, nextNode);
		}
	}
};

module.exports = renderObservableList;